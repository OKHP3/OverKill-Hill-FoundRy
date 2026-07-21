# Custom GPT Corpus Ledger

## Ingestion result

**Verified corpus fact, 2026-07-21:** the temporary ingestion workspace contained 66 source files: 27 DOCX, 25 PDF, and 14 Markdown files. Local extraction completed for all 66 files with no extraction failures and no low-text files flagged for review.

Each source was hashed, extracted locally, and recorded with file provenance in the ignored temporary workspace. The extraction process does not establish that a source claim is true. It establishes only what the corpus contains.

## Prompt-chain recovery result

**Verified corpus fact, 2026-07-20:** the temporary `misc-prompts/` corpus contained 177 processed source files: 129 Markdown files, 47 text files, and one spreadsheet. All sources were extracted without failure. The retained folder README was excluded from processing because it is a user-maintained repository artifact.

The corpus contained a master prompt-chain index, a spreadsheet sequence, and three generations of the same numbered process. No files were exact normalized-text duplicates, but the repeated prompt identifiers and structural roles show that the three generations are revisions of one method. Their wording varied substantially, so the durable synthesis kept only recurring functional patterns rather than selecting a single generation as authoritative.

The result is [Prompt-chain distillation](./PROMPT-CHAIN-DISTILLATION.md): a six-module method with explicit input, exit-gate, and recovery-path requirements. Source-only logic that forced irreversible changes, assumed unavailable platform features, or embedded local/private data was excluded.

## Data-ledger recovery result

**Verified corpus fact, 2026-07-20:** the historical ledger corpus contained 41 usable source files: 22 Markdown files, 16 text files, two Word files, and one YAML file. All extracted successfully. One exact normalized-text duplicate pair was found: `dataledger_archive_v1.txt` and `dataledger_parameters_v1.txt`.

The corpus retained an early thread-transition model: gather raw material, distill it into a smaller capsule, then provide it deliberately to later work. It also contained unsupported claims that Custom GPTs automatically read, write, commit, or restore persistent ledger state. [Data-ledger distillation](./DATA-LEDGER-DISTILLATION.md) preserves the reusable capture and provenance method while excluding the false runtime model.

## Deduplication method

The corpus was compared using normalized token-set similarity. At a threshold of 0.99 or higher, 66 files reduced to 39 content families. This is a **deduplication heuristic**, not a factual-content validation method.

Two exact normalized-text duplicate groups were found:

- `custom-gpt-explanation.docx` and `designing-grade-a-custom-gpts-the-overkill-hill-p3tm-method.docx`
- `operators-cathedral-layout.md` and `operator’s-cathedral-layout.md`

The other duplicated families are predominantly DOCX and PDF editions of the same document. They were treated as one evidence source during synthesis. No source file was deleted.

## Distinct evidence themes

| Theme | Representative source families | Durable use |
| --- | --- | --- |
| Product definition and build briefs | Master Craft Guidebook; definitive reference guide; Custom GPT whitepaper | Define the job, user, boundaries, data, and observable acceptance tests before drafting instructions. |
| Instruction architecture | Master instruction block; GPT-5-era templates; structure-and-ordering research | Write an ordered, conflict-resolved behavior contract rather than a single undifferentiated prompt. |
| Knowledge engineering | Perfect Knowledge File playbook; optimal knowledge-file formation; reuse-limits notes | Build a scoped retrieval corpus with provenance, clear vocabulary, and retrieval tests. |
| Tool, Action, and privacy boundaries | Operationalization and publishing materials; construction standard | Use the least capability needed; make data movement and tool failure behavior explicit. |
| Evaluation and maintenance | Evaluation engineering; manufacturing cookbook; execution plan | Treat changes as hypotheses, run regression checks, and maintain a failure ledger. |
| Prompt stability and interference | Semantic-interference research; Beyond Equilibrium; RAG and RIS bundle | Use as a hypothesis source for contradiction checks, context-boundary tests, and controlled experiments. |
| Shared instruction assets | RIS explainer; canonical ledger material | Centralize reusable public rules in versioned references, but do not assume an attachment behaves as an executable import. |
| GPT-to-Skill conversion | Construction standard and comparison; Custom GPTs vs Agent Skills | Preserve behavior and evidence, isolate platform-only affordances, and test semantic loss. |
| Marketplace, publication, and lifecycle | Marketplace analyses; commerce and adoption material | Keep as historical context only. Revalidate all live product, policy, and market claims before use. |

## Exclusions from durable guidance

The following source material was intentionally not promoted as an operational rule:

- historical model names, plan details, product limits, feature defaults, marketplace claims, and release dates;
- vendor-specific behavior without a current official source;
- fixed character, token, page, or file-count heuristics presented as universal thresholds;
- claims that a file reference or alias automatically executes or imports instructions at runtime;
- recommendations supported only by repetition across derivative documents.

Those items may still be useful as hypotheses or historical records. They are not validated facts for the four Agent Skills.
