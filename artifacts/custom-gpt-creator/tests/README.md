# Creator export fixtures

The committed GitHub Markdown fixture is checked by the `keeps the committed
GitHub fixture generated from representative Creator data` test in
`export-package.e2e.ts`. Normal test runs compare the fixture with a fresh
Creator export and never write to the repository.

When an intentional exporter change requires a new fixture, run:

```sh
pnpm run refresh:github-markdown-fixture
```

This is the only refresh command. It opts into the Playwright refresh test,
writes `fixtures/github-markdown-fixture.v1.md` from the shared representative
data, verifies the written bytes, and then reruns the drift guard. The refresh
test is skipped and never writes unless `GITHUB_MARKDOWN_FIXTURE_REFRESH=1` is
set.
