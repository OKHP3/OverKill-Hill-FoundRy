# Action item extractor with source references

Extract concrete action items from supplied notes while retaining a short source reference for each item.

This is an OverKill Hill FoundRy source package for a prompt capability. It is a reviewable structural draft, not proof of behavior or permission to publish.

## Audience

OverKill Hill readers reviewing meeting notes, transcripts, or project updates.

## Inputs

Plain text notes supplied by the user, optionally with headings, speaker names, dates, or line-like markers.

## Outputs

A concise Markdown table with action, owner when stated, due date when stated, status, and source reference.

## Acceptance

Every extracted row has a traceable source reference; uncertain ownership or timing is labeled unknown; no action is added when the source contains no commitment.
