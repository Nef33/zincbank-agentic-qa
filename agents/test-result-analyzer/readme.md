# Test Result Analyzer Agent

## What it does
Reads the Allure results from a completed test run and turns them into a structured report: overall pass/fail/undefined counts, a category for every scenario that isn't a clean pass, and — by comparing against the most recent prior report — a pipeline-status label (`regression`, `persistent-failure`, `new`, or `undefined/never-implemented`) that Self-Healing Test Healer and Orchestrator both act on directly.

## Input
- Reads the raw Allure result files from `allure-results/` — the `*-result.json` files (one per scenario/step) and `*-container.json` files (hooks) — for a run that has already completed. It never triggers or re-runs `cucumber-js` itself.
- Reads the most recently dated report in `agents/test-result-analyzer/analysis/` (excluding the one it's about to write) as its baseline for comparison, matching scenarios by name and feature file rather than Allure's UUID, which changes every run.

## Output
- A dated report at `agents/test-result-analyzer/analysis/<run-timestamp>.md` with overall counts, a category per non-clean-pass scenario (assertion failure, timeout, locator-or-element-not-found, environment/setup error, flaky-suspected, or undefined-step), and a `## Pipeline Status` table carrying the four labels above.
- A flag on any failure whose pattern looks like the test itself is broken (a stale locator, a missing wait, a race condition) rather than a genuine application regression — that distinction is what Self-Healing Test Healer needs to decide whether it can act.

## Why these choices
`undefined/never-implemented` always takes priority over `regression`, even for a scenario that only just started containing an undefined step, because Self-Healing Test Healer can't write a new step definition — labeling that scenario `regression` would just send Healer somewhere it has no way to actually fix anything.

Comparing against the prior report by scenario name and feature file, not Allure's UUID, is what makes the comparison survive from one run to the next at all — Allure mints a new UUID every run, so matching on it would make every scenario look "new" every single time.

This agent never fixes anything itself, and never re-runs the suite, because its whole value is being a single, honest read of what already happened — if it could also patch code or trigger new runs, a bug in its own fix could quietly change the very results it's supposed to be reporting on.
