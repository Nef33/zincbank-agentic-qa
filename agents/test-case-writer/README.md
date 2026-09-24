# Test Case Writer Agent

## What it does
Reads the RTM and converts each requirement into a Gherkin scenario, tagged so it can be traced back to the requirement(s) it covers. Scenarios are grouped by distinct user action, not by RTM row — if multiple RTM rows describe different outcomes of the same action, they're covered by one scenario with multiple Then/And assertions, tagged with every matching requirement ID. Scenarios reference the real, user-facing labels on the login page (field names, button text, link text) rather than generic paraphrases, so a scenario can be checked for correctness just by reading it. It doesn't invent test coverage that isn't backed by the RTM — anything it notices is missing from the RTM goes into a separate file as a suggestion, never mixed into the real, requirement-backed scenarios.

## Input
- Reads `docs/rtm-login.md` directly via the filesystem tool — not pasted into chat.
- Given a static page-fact reference for the ZincBank login page (below) so it can write scenarios using real labels instead of generic wording. This is static reference text, not live browser access — the agent still has no ability to browse the page itself.

**Page reference (login page):**
- Heading: "Sign in to ZincBank", subtext "Welcome back"
- Fields: **Email** (text input), **Password** (masked input)
- Primary action: **Sign in** button
- Secondary path: "New to ZincBank?" next to an **"Open an account"** link, which goes to `/apply`

## Output
- `features/login.feature` — one scenario per distinct user action, each tagged with every `@REQ-LOGIN-XX` it satisfies, and each written using the real field/button/link labels from the page reference above (e.g. `When I enter a valid email and password and click "Sign in"`, not `When I sign in with my email and password`). A single action that produces multiple required outcomes is one scenario with multiple Then/And lines and multiple tags — not one scenario per RTM row. Only requirements that actually exist in the RTM get covered here.
- `features/login-suggested.feature` — any additional scenarios the agent notices are missing (e.g. edge cases like empty-field submission), kept in a separate file so they can never be mistaken for RTM-backed coverage and never run as part of the default suite unless someone deliberately promotes one.
- `docs/rtm-login.md` is read-only to this agent. It does not update the Coverage column.

## Why these choices
Reading the RTM file directly, instead of pasting it into chat, means this agent can be re-run any time the RTM changes without a person manually copying content between steps.

Scenarios are grouped by user action instead of by RTM row because the row-per-scenario approach produced duplicate and even logically broken output in practice — two RTM rows describing the same action turned into two scenarios repeating the same Given/When, and a related pair turned into a scenario whose Given already assumed the outcome it was supposed to be testing, with no actual action left to test. Grouping by action first and tagging with every requirement it satisfies avoids manufacturing a scenario for an outcome that isn't a separate action.

Scenarios use the page's real labels instead of generic paraphrases because fully abstract wording ("I sign in with my email and password") can't be checked for correctness just by reading it — it could describe any login form. Naming the actual field and button text means a wrong or mismatched scenario is obvious immediately, instead of that check getting silently deferred to the Playwright Script Generator, where a wording mismatch would surface as a confusing implementation bug instead of an obvious one. This is static reference text handed to the agent alongside the RTM, not live browser access, so it doesn't require giving this agent browser tools — that stays scoped to the Script Generator as originally planned.

Traceability uses a Gherkin `@REQ-LOGIN-XX` tag instead of a plain comment. A comment is just text a human can read; a tag is something Cucumber itself understands — the Requirement & Test Verification agent can read tags the standard way instead of scraping comment text for a pattern, and tags double as a way to run or report on scenarios by requirement from the command line.

Suggested scenarios are split into their own file rather than flagged inline, because mixing "the RTM asked for this" with "I noticed this might be worth testing" in the same file is exactly the kind of blurring the no-invention rule exists to prevent. Keeping them physically separate means the default test run never silently executes something nobody asked for, and a person has to deliberately decide to promote a suggestion before it counts as real coverage.

The agent doesn't touch the RTM's Coverage column because marking a requirement "covered" should mean it's been verified as actually satisfied, not just that a scenario with the matching tag exists. If the Writer marked its own output as covered, the Requirement & Test Verification agent's job would be redundant. Keeping the Writer read-only here also matches the same instinct as scoping MCP tools narrowly elsewhere in this pipeline — no agent gets write access it doesn't need.