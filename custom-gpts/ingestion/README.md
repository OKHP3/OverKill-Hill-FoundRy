# Temporary Custom GPT Source Ingestion

Drop temporary `.docx`, `.pdf`, and `.md` source files into this folder when you are ready for them to be examined and distilled.

This is a **local staging area**, not an archive. Its contents are ignored by Git so source documents are not accidentally committed or published. After processing, the source files and any temporary extraction material in this folder can be safely purged. The lasting outputs belong elsewhere in [`custom-gpts/`](../).

## What will happen after sources are loaded

The ingestion workflow should preserve source meaning before it makes recommendations:

1. **Inventory** each file: filename, type, size, date, page count when available, and a content hash.
2. **Extract** the readable content into a normalized, reviewable form. Preserve source location, page or section references, headings, lists, tables, and file provenance.
3. **Compare and consolidate** repeated ideas without treating repetition as proof. Keep conflicting approaches, uncertainties, and historical versions visible.
4. **Distill** the reusable material into traceable outputs: principles, workflow steps, instruction patterns, knowledge-file practices, capability decisions, evaluation prompts, templates, and open questions.
5. **Package actionable results** only after review. Every substantive recommendation should point back to one or more source documents.

The objective is not to flatten your methodology into generic advice. It is to make its evidence, repeatable patterns, and decisions easy to inspect, reuse, test, and improve.

## Recommended tools

Use a two-level approach:

| Need | Recommended tool | Why |
| --- | --- | --- |
| Local first pass for `.docx`, text-based `.pdf`, and `.md` | Bundled Python runtime with `python-docx`, `pdfplumber`, and `pypdf` | Already available locally. It can create an inventory and extraction ledger without sending documents to a third party. |
| Quick conversion of many formats to Markdown | [MarkItDown](https://github.com/microsoft/markitdown) | Lightweight Python converter designed to turn documents into Markdown for language-model and text-analysis pipelines. Install only after approval. |
| Complex PDF layout, tables, reading order, or scanned pages | [Docling](https://docling-project.github.io/docling/reference/document_converter/) | Converts PDF, DOCX, Markdown, and more into a structured intermediate representation, Markdown, or JSON. Prefer it when preserving structure matters. Install only after approval. |
| Element-level classification and controlled chunking | [Unstructured](https://docs.unstructured.io/open-source/core-functionality/partitioning) | Separates material into elements such as titles, narrative text, and list items, useful when a later review needs selective evidence rather than one giant text dump. Install only after approval. |

Docling is the preferred upgrade for this collection because Custom GPT instructions, templates, tables, and examples often lose their meaning when document structure is discarded. MarkItDown is a good lightweight alternative when clean Markdown is sufficient. The bundled tools remain the conservative baseline.

## Handling notes

- Do not place credentials, API keys, or material that cannot be processed locally in this folder.
- Scanned or image-only PDFs require OCR. Flag them during inventory so they do not silently produce empty or incomplete text.
- Keep originals unchanged. Normalized copies and extracted text are working material, not replacements.
- Markdown already carries useful structure. Preserve its headings, links, code fences, and front matter instead of converting it to plain text.
- Do not delete source files until the distilled output has been reviewed and accepted.

## Ready state

When files are present, ask for an **ingestion pass**. The first pass will inventory and extract the collection before any synthesis or rewriting occurs.
