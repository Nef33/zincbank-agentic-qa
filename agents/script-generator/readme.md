# Playwright Script Generator Agent

## What it does
Reads the tagged scenarios in `features/login.feature` and writes matching Cucumber step definitions in `step-definitions/` that drive the real ZincBank login page — finding the actual Email/Password fields, the actual "Sign in" button, and the actual "Open an account" link. It does this using a pre-built locator reference file, not by browsing the live page itself — this agent has no browser access at all.

## Input
- Reads `features/login.feature` — only the RTM-backed scenarios, not `login-suggested.feature`, since suggested scenarios aren't part of the default suite until someone deliberately promotes one.
- Reads `docs/locators-login.md` — a fixed reference mapping each real page element to its Playwright locator, built once by hand/inspection rather than rediscovered by this agent on every run.
- References test credentials via environment variables only (`process.env.ZINC_TEST_EMAIL`, `process.env.ZINC_TEST_PASSWORD`) — it never reads, writes, or hardcodes an actual credential value anywhere in generated code.

## Output
- `step-definitions/login.steps.ts` — one step definition per unique Given/When/Then/And line found across the scenarios, not one set of definitions per scenario. The same `Given I am on the ZincBank login page` step is already shared by all three scenarios, so writing it three times would just be duplicate code for identical behavior.

## Why these choices
No browser access for this agent at all, rather than read-only inspection, because selector discovery only needs to happen once — the page's structure doesn't change between runs, so there's no ongoing need for this agent to re-earn what's already known. Handing it a fixed locator file instead of live access removes an entire class of risk (an unreliable model misreading the DOM, or accidentally triggering a real page action) for something that isn't actually a per-run decision.

The locator reference itself was built by directly inspecting the page once, rather than guessed at — and even then, one field's mapping is flagged as unconfirmed (whether "Password" is a real `<label>` or an `aria-label`) rather than stated as certain, since it wasn't actually verified. A locator reference is only useful if it's honest about what's confirmed versus assumed.

Credentials are read from environment variables, never written into any file this agent produces, because a `.feature` file or step definition living in the repo is something anyone with read access to the repo can see — and this repo is public. This is the same instinct behind never letting the Test Case Writer put a literal value in a scenario: the actual secret lives in `.env`, which is gitignored and never committed, and only its variable name appears anywhere in tracked code.

One step definition per unique step line, not per scenario, follows the same instinct as the Test Case Writer's scenario-grouping fix: don't generate duplicate code for behavior that's already identical just because it's referenced from more than one place.