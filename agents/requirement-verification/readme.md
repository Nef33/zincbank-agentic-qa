# Requirement & Test Verification Agent

## What it does
Cross-checks `features/login.feature` against `docs/rtm-login.md` in both directions — flags any RTM requirement with no scenario covering it, and any `@REQ-LOGIN-XX` tag on a scenario that doesn't correspond to a real RTM row (a typo'd or stale tag would otherwise silently drop that scenario from being tracked against anything). It also checks that `features/login-suggested.feature` stays untagged — if a suggested scenario ever picked up a `@REQ` tag, that would break the separation the Test Case Writer is supposed to maintain between invented and RTM-backed coverage. For each RTM row it can confirm is genuinely satisfied (not just tag-matched — it reads the scenario's actual steps against the requirement's wording), it records which scenario covers it and marks it verified.

## Input
- Reads `docs/rtm-login.md`
- Reads `features/login.feature`
- Reads `features/login-suggested.feature` (only to confirm it has no `@REQ` tags — its contents are never counted toward coverage)

## Output
- Updates `docs/rtm-login.md`: fills in the `Test Case(s)` column with the name of the scenario covering each row, and changes `Coverage Status` from "Pending" to one of three states — `Covered` (a tagged scenario exists and its steps plausibly satisfy the requirement), `Gap` (no scenario carries that tag at all), or `Mismatch` (a scenario carries the tag, but its steps don't appear to actually satisfy what the requirement describes — flagged for a person to look at, not silently passed).
- Writes a separate `docs/verification-report-login.md` listing anything not clean: gaps, mismatches, and orphan tags (a `@REQ-LOGIN-XX` on a scenario with no matching RTM row). This is so a person can scan one short file for problems instead of diffing the whole RTM to notice a status quietly flipped to `Gap`.
- Does not modify `features/login.feature` or `features/login-suggested.feature` — this agent verifies and records, it doesn't rewrite scenarios. Fixing a gap or mismatch is a decision for a person (or a future agent) to make, not something this one does on its own.

## Why these choices
This is the first agent in the pipeline with write access to the RTM, and that's deliberate, not an oversight carried over from the Test Case Writer. The Writer was kept read-only specifically so that "covered" would mean something real — verified by a separate check — rather than an agent marking its own output as done. This agent is that separate check.

Checking in both directions matters because a tag mismatch can fail silently in either one: a missing tag looks like a gap (obvious), but a tag pointing at a requirement ID that doesn't exist (a typo, or a row that got renumbered) would otherwise just vanish from tracking with nothing flagging it. Catching orphan tags is what makes the traceability tags from the Writer's README actually trustworthy over time instead of just at the moment they're written.

`Mismatch` exists as its own status, distinct from `Covered` and `Gap`, because tag presence alone was already shown not to be reliable evidence of correctness — that's the exact failure mode that produced the broken `REQ-LOGIN-002` scenario earlier. A tag can exist and still not actually prove the requirement, and collapsing that into either "covered" or "gap" would hide a real problem instead of surfacing it.

Verifying that the suggested-scenarios file stays untagged is what actually enforces the separation designed into the Writer, rather than just trusting it holds. If a suggested scenario ever picked up a real tag, it would start silently counting as RTM-backed coverage with no one deciding that on purpose — the exact blurring the split file was built to prevent.

The verification report is a separate file rather than just relying on the updated RTM because a person shouldn't have to notice a quiet status change buried in a table to find out something's wrong — a short, dedicated list of open problems is easier to actually check before trusting the pipeline moved forward. It carries a `-<feature>` suffix, matching the RTM and the feature file it verifies, so multiple features' reports can coexist without overwriting each other.

This agent doesn't edit the `.feature` files themselves, keeping the same narrow-scope instinct as the rest of the pipeline: its job is to check and report, not to fix. A "verifier" that can also silently rewrite the thing it's verifying isn't really independent anymore.
