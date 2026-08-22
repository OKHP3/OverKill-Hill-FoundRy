# Rollback plan

If a release is approved and later withdrawn:

1. Stop the separate deployment job or remove the public artifact surface.
2. Preserve the released files and review record in an audit archive.
3. Mark the affected version withdrawn in the changelog and provenance.
4. Route readers to the last approved version, or return a blocked result if
   no approved replacement exists.
5. Re-run the source and equilibrium audits before any replacement release.