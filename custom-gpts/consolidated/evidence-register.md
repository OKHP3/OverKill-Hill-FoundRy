# Custom GPT Evidence Register

Use this register when interpreting the temporary corpus or changing the four Custom GPT-related Agent Skills.

## Verified platform facts

These statements were checked against current official OpenAI documentation during this consolidation. They should be rechecked before a release that depends on them.

| Claim | Status and source |
| --- | --- |
| A Custom GPT is a configured version of ChatGPT that can combine instructions, knowledge, and selected capabilities. | Verified platform fact. [GPTs in ChatGPT](https://help.openai.com/en/articles/8554407-gpts-in-chatgpt) |
| GPTs can be built conversationally or configured directly in the ChatGPT web editor; creating and editing depends on subscription and workspace permission. | Verified platform fact. [Creating and editing GPTs](https://help.openai.com/en/articles/8554397-creating-and-editing-gpts) |
| Knowledge files are reference material, while instructions define behavior. | Verified platform fact. [Creating and editing GPTs](https://help.openai.com/en/articles/8554397-creating-and-editing-gpts) |
| Available built-in capabilities include web search, image generation, Canvas, and Code Interpreter and Data Analysis, subject to account, workspace, and regional availability. | Verified platform fact. [Creating and editing GPTs](https://help.openai.com/en/articles/8554397-creating-and-editing-gpts) |
| A GPT can use Apps or Actions, but not both at the same time. | Verified platform fact. [GPTs in ChatGPT](https://help.openai.com/en/articles/8554407-gpts-in-chatgpt) |
| GPT builders cannot view individual conversations with their GPT; external apps and APIs can receive relevant user input. | Verified platform fact. [GPTs in ChatGPT](https://help.openai.com/en/articles/8554407-gpts-in-chatgpt) |
| GPT conversations start fresh and do not use saved memory, personal custom instructions, or earlier conversations. | Verified platform fact. [GPTs in ChatGPT](https://help.openai.com/en/articles/8554407-gpts-in-chatgpt) |
| Knowledge is uploaded reference material. It is not documented as a Custom GPT-managed persistent write store. | Verified platform fact. [Creating and editing GPTs](https://help.openai.com/en/articles/8554397-creating-and-editing-gpts) |
| Data Analysis can create downloadable files in chat when enabled, but persistent writeback requires an external authority and an explicitly designed integration. | Verified platform fact for downloadable files and Actions connectivity. [Troubleshooting GPTs](https://help.openai.com/en/articles/11325361-why-can-t-i-download-files-generated-by-my-custom-gpt) · [Configuring actions in GPTs](https://help.openai.com/en/articles/9442513) |

OpenAI's current file-limit documentation is inconsistent: the GPT editor article says 20 attached files, while the File Uploads FAQ says 10 files per GPT lifetime. Treat numeric limits as release-time verification work rather than a durable design rule. [Creating and editing GPTs](https://help.openai.com/en/articles/8554397-creating-and-editing-gpts) · [File Uploads FAQ](https://help.openai.com/en/articles/8555545-file-uploads-faq/)

Do not copy model names, feature defaults, eligibility rules, price information, or capacity figures from the temporary corpus into a durable instruction. Those claims are time-sensitive and require a new primary-source check.

## Verified corpus facts

- 66 temporary source files were processed locally with no extraction failures.
- The corpus contains 39 similarity-based content families at a normalized token-set threshold of 0.99.
- Two exact normalized-text duplicate groups were identified.

See [Corpus ledger](./CORPUS-LEDGER.md) for method and limits.

## Source-derived practices to adopt conditionally

| Practice | Why it is useful | Required validation |
| --- | --- | --- |
| Start from a build brief and acceptance tests. | Makes a GPT a defined product rather than a generic persona. | Confirm that each acceptance test is observable and relevant to the user. |
| Separate instructions, reference content, and tool policy. | Reduces mixed-purpose context and clarifies ownership of rules. | Test the intended behavior and source use in Preview. |
| Organize knowledge into focused, clearly headed files with provenance. | Makes review, maintenance, and retrieval evaluation easier. | Test actual retrieval with representative and adversarial queries. |
| Use explicit tool triggers, data limits, fallbacks, and confirmation rules. | Makes external behavior inspectable and reduces avoidable data movement. | Test tool use, non-use, failure, and side-effect boundaries. |
| Maintain a golden prompt set and add observed failures to it. | Converts learning into a regression mechanism. | Record before and after outcomes for each change. |
| Treat Custom GPT to Skill conversion as semantic mapping, not text copying. | Avoids promising ChatGPT-only behavior in a portable package. | Map every asset to a destination, adapter, exclusion, or drop decision. |
| Use a thread-transition capsule for long-running work. | Preserves only the decisions, open work, provenance, and constraints needed by the next task. | Start a new thread with only the capsule and verify that it can continue without invented facts or lost boundaries. |

## Theories and preferences that must not become facts by repetition

| Claim | Label | How to use it safely |
| --- | --- | --- |
| Semantic interference causes behavior drift. | Theory | Turn it into tests for contradictions, context conflicts, and output omissions. Do not claim a specific mechanism without evidence. |
| A shared reference file can keep a GPT family consistent. | Theory | Version the reference and test every dependent GPT after changes. An attachment is not an executable import. |
| Small, focused knowledge files always outperform larger documents. | Theory | Treat as a retrieval experiment; measure accuracy and maintainability on the actual corpus. |
| A particular prompt length, file count, output size, or document page count is optimal. | Preference or unverified heuristic | Use only as a tentative starting condition, then measure. |
| A multi-agent workflow is inherently superior. | Theory | Compare it against a simpler single-agent process for quality, cost, and consistency. |
| A hydration file restores the full state of a past thread or GPT. | Theory / false platform model when asserted as automatic behavior | Use an explicit handoff artifact and validate the next task. Do not call it persistent memory. |
