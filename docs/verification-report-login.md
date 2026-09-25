# Verification Report — ZincBank Login

**Date:** 2026-09-25
**Agent:** Requirement & Test Verification

## Result Summary

| Requirement ID | Test Case(s) | Coverage Status |
|---|---|---|
| REQ-LOGIN-001 | Sign in with valid credentials | Covered |
| REQ-LOGIN-002 | Sign in with valid credentials | Covered |
| REQ-LOGIN-003 | Sign in with invalid credentials | Covered |
| REQ-LOGIN-004 | Sign in with invalid credentials | Covered |
| REQ-LOGIN-005 | Open an account from the login page | Covered |

## Coverage Notes

- **REQ-LOGIN-001** — Covered by `Sign in with valid credentials`: the `When` step enters a valid email and password and clicks "Sign in", satisfying the requirement to sign in with email and password.
- **REQ-LOGIN-002** — Covered by `Sign in with valid credentials`: the `Then` step asserts the user is granted access to their account, satisfying the post-sign-in access requirement.
- **REQ-LOGIN-003** — Covered by `Sign in with invalid credentials`: the `Then` step asserts an error message is shown, satisfying the invalid-credentials error requirement.
- **REQ-LOGIN-004** — Covered by `Sign in with invalid credentials`: the `And` step asserts the user is kept on the login page, satisfying the stay-on-login-page requirement.
- **REQ-LOGIN-005** — Covered by `Open an account from the login page`: the `When` step clicks "Open an account" and the `Then` step asserts navigation to `/apply`, satisfying the navigate-to-account-creation requirement.

## Findings

### Gaps
None.

### Mismatches
None.

### Orphan Tags
None. Every `@REQ-LOGIN-XX` tag in `features/login.feature` corresponds to a row in `docs/rtm-login.md`.

### Suggested-Scenarios File
`features/login-suggested.feature` is correctly untagged — no `@REQ-LOGIN-XX` tags present. It remains separate from RTM-backed coverage.