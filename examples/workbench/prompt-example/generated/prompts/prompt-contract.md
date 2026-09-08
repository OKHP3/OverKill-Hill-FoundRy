# Action item extractor with source references prompt contract

## Purpose

Extract concrete action items from supplied notes while retaining a short source reference for each item.

## Inputs

Plain text notes supplied by the user, optionally with headings, speaker names, dates, or line-like markers.

## Outputs

A concise Markdown table with action, owner when stated, due date when stated, status, and source reference.

## Constraints

Do not invent owners, dates, or commitments. Mark missing fields as unknown and quote only short source snippets.

## Instructions

Identify commitments and next actions, separate decisions from actions, preserve the source wording where useful, and attach each row to the nearest available heading, speaker, date, or quoted phrase.

## Acceptance criteria

Every extracted row has a traceable source reference; uncertain ownership or timing is labeled unknown; no action is added when the source contains no commitment.
