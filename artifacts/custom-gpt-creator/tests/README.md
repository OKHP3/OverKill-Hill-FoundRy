# Creator export fixtures

The committed GitHub Markdown fixture is checked by the `keeps the committed
GitHub fixture generated from representative Creator data` test in
`export-package.e2e.ts`. Normal test runs compare the fixture with a fresh
Creator export and never write to the repository.

To run only this deterministic drift guard:

```sh
pnpm run test:github-markdown:fixture
```

Before updating the fixture, preview and classify the generated difference:

```sh
pnpm run preview:github-markdown-fixture
```

The preview never writes the committed fixture. It reports one of three results:
no changes, generated metadata only, or actual export content changes. For a
content change, it includes the number of differing line positions and the first
before/after line. Generated metadata-only changes show the date lines and
explain that refresh preserves the committed date.

After reviewing an intentional exporter change, update the fixture with the
existing one-command refresh:

```sh
pnpm run refresh:github-markdown-fixture
```

This remains the only write command. It prints the same classified preview,
opts into the Playwright refresh test, writes
`fixtures/github-markdown-fixture.v1.md` from the shared representative data,
verifies the written bytes, and then reruns the drift guard. The test is skipped
and never writes unless either preview or refresh is explicitly enabled; preview
mode always returns before the write. The refresh preserves the generated-date
line already committed in the fixture, so running it on different calendar
dates produces identical bytes unless exporter behavior changes. The drift guard
still normalizes that line before reporting the first meaningful content
difference.
