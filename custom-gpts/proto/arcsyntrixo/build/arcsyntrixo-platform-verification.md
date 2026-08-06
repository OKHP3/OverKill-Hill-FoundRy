# ArcSyntrixo Platform Verification Register

Checked: 2026-07-25

Source policy: current official OpenAI Help Center documentation only.

## Verified facts used in this bundle

| Claim | Status | Source |
|---|---|---|
| GPTs can be configured with name, description, conversation starters, instructions, knowledge, selected capabilities, and Actions. | verified | https://help.openai.com/en/articles/8554397-creating-with-chatgpt |
| Knowledge is reference material; behavior and workflow rules belong in Instructions. | verified | https://help.openai.com/en/articles/8554397-creating-with-chatgpt |
| A GPT can attach up to 20 files, each up to 512 MB. | verified | https://help.openai.com/en/articles/8554397-creating-with-chatgpt |
| Preview testing should occur before sharing or publishing. | verified | https://help.openai.com/en/articles/8554397-creating-with-chatgpt |
| Apps and Actions cannot be used together in one GPT. | verified | https://help.openai.com/en/articles/8554407-gpts |
| GPT creation and editing occur in the web experience and require an eligible plan and any necessary workspace permission. | verified | https://help.openai.com/en/articles/8554397-creating-with-chatgpt |
| A Custom GPT conversation starts fresh and does not use saved memory, personal custom instructions, or previous conversations. | verified | https://help.openai.com/en/articles/8554407-gpts |

## Configuration consequence

ArcSyntrixo v1.0 uses no Actions or Apps, requires no credentials, starts with all optional capabilities off, uploads only five text-forward reference files, and remains private until Preview evidence exists. The legacy terms `hydration`, `ledger`, `agent loop`, and `survivorship` are treated as user-visible review concepts, not as claims of persistent runtime behavior.

## Still requires direct Builder verification

- The exact labels and capability toggles in the current editor.
- The account or workspace permission to create and test a private GPT.
- Successful retrieval of every uploaded knowledge file.
- The current recommended model, if a model choice is necessary.
- Any future Action/App capability, authentication, privacy policy, and consequential-action requirements.
