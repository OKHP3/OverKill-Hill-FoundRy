---
name: ReFolDec capture contract
description: Durable rules for process captures that move between Fold, Unfold, and Refold.
---

The ReFolDec process capture record is the source of truth for process
transformation. Stable `act-NNN`, `gw-NNN`, and `evt-NNN` identifiers, evidence
references, confidence, ambiguity, rejected material, and recovery routes must
survive every transformation.

**Why:** Process descriptions and diagrams can look complete while silently
losing source context or unresolved claims; the capture pipeline must make those
losses visible and recoverable.

**How to apply:** Do not treat a structured document, model-ready view, reusable
primitive, or publication candidate as correct or reusable until its provenance
is retained and a subject-matter confirmation gate is complete.