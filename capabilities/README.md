# Capability projects

This is the home for consolidated OverKill FoundRy products. Use one stable
`capabilities/<slug>/` subtree per capability, independent of its GPT, skill,
plugin or connector packaging. The existing root-level GPT source folders remain
preserved pending individual migrations; no external repository has been imported
by establishing this directory.

Follow the [migration contract](../docs/portable-skill-foundry.md). Track each
approved source and destination in the
[migration registry](../registry/capability-migrations.json), referenced by the
[main registry](../registry/index.yaml).

The browser workbench exports the content of a prospective capability directory.
Review it, supply the missing source/license and evaluation evidence, and place
it under a chosen slug before submitting a repository change. Product skills live
in `skills/<skill-name>/`, while `.agents/skills/` holds repository contributor tools.
