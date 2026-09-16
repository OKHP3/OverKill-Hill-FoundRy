import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// Execute the actual Actions script with a local GitHub API fixture.
const workflow = readFileSync(new URL("../.github/workflows/branch-cleanup.yml", import.meta.url), "utf8");
const source = workflow.split("script: |")[1].split(/\r?\n/).map(line => line.replace(/^ {12}/, "")).join("\n");
const execute = new (Object.getPrototypeOf(async function () {}).constructor)("github", "context", "core", source);

async function run({ merged = false, open = false, changed = false, protectedBranch = false,
  inputs, eventName = "schedule", mergedSha = "tip" } = {}) {
  const deleted = [], messages = [], failures = [];
  const branch = { name: "old-task", commit: { sha: "tip" }, protected: protectedBranch };
  const openPR = { head: { ref: branch.name, sha: "tip", repo: { full_name: "owner/repo" } } };
  const github = {
    paginate: (fn, args) => fn(args),
    rest: {
      repos: {
        get: async () => ({ data: { default_branch: "main" } }),
        listBranches: async () => [branch],
        getBranch: async () => ({ data: { ...branch, commit: { sha: changed ? "new-tip" : "tip" } } }),
        getCommit: async () => ({ data: { commit: { committer: { date: "2020-01-01T00:00:00Z" } } } }),
      },
      pulls: { list: async ({ state }) => state === "open" ? (open ? [openPR] : [])
        : (merged ? [{ merged_at: "2020-01-02", head: { sha: mergedSha } }] : []) },
      git: { deleteRef: async ({ ref }) => deleted.push(ref) },
    },
  };
  await execute(github, { repo: { owner: "owner", repo: "repo" }, eventName, payload: { inputs } },
    { info: message => messages.push(message), warning: message => messages.push(message),
      setFailed: message => failures.push(message) });
  return { deleted, messages, failures };
}

test("old unmerged work is reported without deletion", async () => {
  const result = await run();
  assert.deepEqual(result.deleted, []);
  assert.ok(result.messages.some(message => message.startsWith("Review old-task:")));
});
test("exact merged tip is eligible", async () => {
  assert.deepEqual((await run({ merged: true })).deleted, ["heads/old-task"]);
});
test("a merged PR for an older tip does not justify deletion", async () => {
  assert.deepEqual((await run({ merged: true, mergedSha: "older-tip" })).deleted, []);
});
test("an open PR or protected branch is retained", async () => {
  for (const options of [{ open: true }, { protectedBranch: true }]) {
    assert.deepEqual((await run({ merged: true, ...options })).deleted, []);
  }
});
test("a branch changed during cleanup is retained", async () => {
  assert.deepEqual((await run({ merged: true, changed: true })).deleted, []);
});
test("manual runs default to dry run and honor the explicit input", async () => {
  assert.deepEqual((await run({ merged: true, eventName: "workflow_dispatch" })).deleted, []);
  assert.deepEqual((await run({ merged: true, eventName: "workflow_dispatch", inputs: { dry_run: "false" } })).deleted, ["heads/old-task"]);
});
test("invalid age inputs fail without deleting", async () => {
  const result = await run({ merged: true, eventName: "workflow_dispatch", inputs: { stale_days: "-1", dry_run: "false" } });
  assert.deepEqual(result.deleted, []);
  assert.equal(result.failures.length, 1);
});
