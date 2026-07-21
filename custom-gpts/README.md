# Custom GPTs

**Purpose:** a collection and consolidation point for the Custom GPT concept, its practical use, and the repository's earlier GPT-building artifacts.

> Status: public orientation document. Platform-specific details were checked against OpenAI documentation on 2026-07-20 and may change with plans, workspace settings, region, and product updates.

## In plain language

A **Custom GPT** is a reusable, purpose-built version of ChatGPT. Instead of repeating the same background, writing style, process, and reference material every time you start a chat, you package those choices into one named assistant for a specific job.

Think of ordinary ChatGPT as a capable generalist at an empty desk. A Custom GPT is that generalist given a job description, a playbook, a reference shelf, and only the tools needed for the work. A person could make one to turn meeting notes into a standard report, answer questions from a handbook, tutor a student, review a recurring kind of document, or analyze a familiar data file.

A Custom GPT is **not** a newly trained model, fine-tuning, or a standalone application. It is a no-code configuration that runs inside ChatGPT. It is also not automatically an autonomous agent: it responds to users and may use only the features and external connections that its builder enables.

## What a Custom GPT contains

| Part | What it does |
| --- | --- |
| Name and description | Tell people what the assistant is for. |
| Instructions | Set the role, workflow, tone, boundaries, and response format used in every conversation. |
| Conversation starters | Show useful example requests when someone opens it. |
| Knowledge files | Provide reference material, such as guides, policies, examples, or data. These inform answers; they are not the GPT's behavioral rules. |
| Capabilities | Enable built-in features, where available, such as web search, image generation, Canvas, or data analysis. |
| Apps or Actions | Connect to external services through user-connected apps or builder-defined APIs. A GPT can use apps or actions, but not both at once. |
| Sharing settings | Keep it private, share it directly or in a workspace, share by link, or, when eligible, publish it publicly. |

## What it can do

The GPT's capabilities come from its configuration. Depending on account, workspace, regional, and plan availability, a builder may enable it to:

- Follow a consistent, multi-step workflow and produce a repeated format.
- Answer questions using uploaded reference files.
- Search the web for current information.
- Analyze data, make calculations, and generate charts.
- Generate images from written prompts.
- Draft and refine longer or structured work in Canvas.
- Retrieve information from, or take approved actions in, an external system through an app or API action.

More tools do not automatically make a GPT better. A focused GPT with good instructions and clean reference files is usually more dependable than one with every switch enabled.

## How someone creates one

Creating a Custom GPT usually does not require programming. At the time this document was checked, creating and editing happens in the ChatGPT web experience and requires a paid ChatGPT subscription, plus any permission required by a managed workspace.

1. Open the [GPTs area in ChatGPT](https://chatgpt.com/gpts) and choose **Create**.
2. Start either by describing the intended assistant to the conversational builder, or by setting its fields directly in the configuration view.
3. Give it a clear name and description. Add realistic conversation starters.
4. Write instructions that state the job, the desired process, expected outputs, limits, and examples.
5. Upload only the reference files it genuinely needs. Put behavioral rules in instructions, not in knowledge files.
6. Enable only the capabilities that serve the job. If it needs an outside system, choose either apps or custom API actions.
7. Test it in Preview with real and awkward examples. Adjust the instructions or knowledge, then test again.
8. Save it, choose an appropriate sharing level, and return to update it as the job or source material changes. The editor provides version history for created GPTs.

The most promising starting point is a task you already repeat: a prompt you keep reusing, files you keep uploading, or instructions you keep giving to teammates.

## Important boundaries and privacy notes

- A GPT is used inside ChatGPT. It is not a way to embed a chatbot in a separate website or product; that needs an API-based solution.
- Each conversation starts fresh. Custom GPTs do not use saved memory, personal custom instructions, or previous conversations.
- GPT builders cannot view an individual's conversations with their GPT.
- If a GPT uses an external app or API, relevant parts of the user's input may be sent to that third party. Use only integrations you trust, and read their data practices.
- Plan and workspace controls affect what people can create, use, connect, and share. Confirm the live Builder interface before depending on a particular feature or limit.

## When a Custom GPT is worth making

Build one when consistency and reuse matter: repeated work, a stable process, a common reference set, or an experience you want other people to use without reconstructing your prompt. For a one-off question or experiment, an ordinary ChatGPT conversation is usually enough.

## Repository consolidation map

This folder is the orientation layer. The historical and specialized material remains in place:

| Artifact area | Role |
| --- | --- |
| [`proto/gpt-wizard/`](./proto/gpt-wizard/) | Design consultation archive, instruction templates, and building reference library. |
| [`proto/gpt-crucible/`](./proto/gpt-crucible/) | Retired GPT builder and lineage archive. |
| [`proto/gpt-auditor/`](./proto/gpt-auditor/) | Audit prompt and capability-disclosure artifacts. |
| [`proto/`](./proto/) | Normalized repository-side containers for the OverKill Hill proto-GPT portfolio. |
| [`.agents/skills/okhp3-custom-gpt-builder/`](../.agents/skills/okhp3-custom-gpt-builder/) | Current repository-native methodology for designing, testing, and maintaining Custom GPTs. |
| [`ingestion/`](./ingestion/) | Temporary, Git-ignored staging area for external Custom GPT source files awaiting extraction and distillation. |
| [`consolidated/`](./consolidated/) | Deduplicated operating method and evidence register distilled from the temporary source corpus. |

## Official reference links

- [Using custom GPTs, OpenAI Academy](https://openai.com/academy/custom-gpts/)
- [Creating and editing GPTs, OpenAI Help Center](https://help.openai.com/en/articles/8554397-creating-and-editing-gpts)
- [GPTs in ChatGPT, OpenAI Help Center](https://help.openai.com/en/articles/8554407-gpts-in-chatgpt)
- [Introducing GPTs, OpenAI](https://openai.com/index/introducing-gpts/)
- [OpenAI Academy club resource: Custom GPTs](https://academy.openai.com/public/clubs/work-users-ynjqu/resources/custom-gpts)
- [Explore GPTs](https://chatgpt.com/gpts) and [My GPTs](https://chatgpt.com/gpts/mine) in ChatGPT
