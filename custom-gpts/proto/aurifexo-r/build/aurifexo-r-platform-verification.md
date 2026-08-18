# Aurifexo-R Platform Verification Register

Checked: 2026-07-25
Source policy: current official OpenAI Help Center documentation only.

## Verified facts used in this bundle

| Claim | Status | Source |
|---|---|---|
| GPTs can be configured with name, description, starters, instructions, knowledge, capabilities, and actions | verified | https://help.openai.com/en/articles/8554397-creating-with-chatgpt |
| GPT Knowledge supports up to 20 files and 512 MB per file | verified | https://help.openai.com/en/articles/8554397-creating-with-chatgpt |
| Knowledge should hold reference material while behavior belongs in Instructions | verified | https://help.openai.com/en/articles/8554397-creating-with-chatgpt |
| Preview testing is expected before sharing or publishing | verified | https://help.openai.com/en/articles/8554397-creating-with-chatgpt |
| Apps and Actions cannot be used together in one GPT | verified | https://help.openai.com/en/articles/8554397-creating-with-chatgpt |
| Public GPTs using Actions require a valid Privacy Policy URL for each public Action | verified | https://help.openai.com/en/articles/8798878 and https://help.openai.com/en/articles/9442513 |
| GPT creation and editing are web-based and require appropriate plan or workspace permission | verified | https://help.openai.com/en/articles/8554397-creating-with-chatgpt |
| Uploaded text and document files have a 2M-token per-file limit | verified | https://help.openai.com/en/articles/20001052-library-for-chatgpt |

## Configuration consequence

The v1 bundle uses no Actions or Apps, keeps capabilities off, uploads only focused text-forward reference files, starts with private access, and requires Preview evidence before any broader sharing decision.

## Still requires direct Builder verification

- Whether the exact current editor labels match this bundle.
- Whether the selected account or workspace permits GPT creation and private sharing.
- Whether each Knowledge file retrieves correctly after upload.
- Which recommended model is currently available and suitable.
