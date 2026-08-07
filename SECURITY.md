# Security Policy

## Supported scope

This repository is a documentation and process-artifact repository. It does not ship a runtime, server, or deployed application from its root. The only executable content is the Python audit utilities in `scripts/` and the Agent Skills in `.agents/skills/`.

Security reports are welcome for:

- Vulnerabilities in the Python scripts that could cause unsafe behavior when run by a maintainer or automated workflow.
- Sensitive information (credentials, tokens, personal data) accidentally committed to the repository.
- Dependency vulnerabilities flagged in `.github/dependabot.yml` updates that carry real risk.

Out of scope:

- Theoretical or speculative issues with no demonstrated impact on this repository.
- Issues in third-party tools or platforms this repository documents but does not distribute.

---

## Reporting a vulnerability

**Do not open a public GitHub Issue for security vulnerabilities.**

Report vulnerabilities through one of the following channels:

- **GitHub private vulnerability reporting:** use the "Report a vulnerability" button on the repository's Security tab on GitHub. This opens a private advisory thread visible only to maintainers.
- **Email:** if private reporting is not available, send details to the repository maintainers via the contact listed on the OKHP3 GitHub organization profile.

Include in your report:

1. A clear description of the vulnerability and its potential impact.
2. Steps to reproduce or a minimal example.
3. The affected file(s), script(s), or dependency.
4. Any suggested remediation, if you have one.

---

## Response process

1. Maintainers will acknowledge receipt within 7 days.
2. The report will be assessed and triaged within 14 days.
3. A fix or mitigation will be planned and communicated privately before any public disclosure.
4. Once a fix is merged, the reporter will be credited in the release notes unless they request anonymity.

---

## Dependency updates

GitHub Dependabot is configured (`.github/dependabot.yml`) to submit weekly pull requests for GitHub Actions dependency updates. Maintainers review and merge these updates as part of regular repository hygiene.

---

## No runtime guarantee

This repository does not provide a production runtime, SLA, or uptime guarantee. Security fixes will be made on a best-effort basis consistent with the project's volunteer maintenance model.
