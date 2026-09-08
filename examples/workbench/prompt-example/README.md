# Prompt package example: action items with source references

This public-safe example uses the FoundRy capability generator to package a prompt that extracts action items from supplied notes and attaches a source reference to each row.

Run the generator from the repository root:

```bash
node --strip-types examples/workbench/prompt-example/generate.ts
```

The command writes `backup.json` and the importable generated package under `generated/`. It also parses the backup produced by the real workbench generator and checks the project identity after the round trip.

`cases.json` contains representative inputs and authored expectations. `executedCheck: "not-run"` is deliberate: the repository does not claim model execution, behavioral validation, or publication readiness from these fixtures.
