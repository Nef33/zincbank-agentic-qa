# Self-Healing Test Healer Agent

## What it does
Reads Test Result Analyzer's most recent report and, only for scenarios explicitly tagged `regression` (a scenario that passed cleanly in the prior run and now fails), attempts one small, targeted fix to the Page Object or step definition code responsible — an updated locator, a hardcoded wait replaced with an explicit `waitFor`, that kind of change. It never touches a `persistent-failure`, `new`, or `undefined/never-implemented` scenario, and it never writes a step definition from scratch.

## Input
- Reads Test Result Analyzer's latest analysis report, specifically the scenarios tagged `regression` — their error message, stack trace, and which step/locator failed.
- Reads the actual Page Object and/or step definition file involved, so its fix matches the existing code's patterns and locator conventions.
- Has no browser access and does not inspect the live page — it works entirely from the error data Test Result Analyzer already recorded.

## Output
- The modified Page Object or step definition file, with one minimal, targeted fix per regression.
- An entry in a healing log at `agents/self-healing-test-healer/healing-log/<timestamp>.md` recording exactly what changed, the error it was responding to, and which scenario it addressed.
- If it can't identify a confident fix from the available error data, it doesn't guess — it logs the scenario as "unable to auto-heal, needs manual review" and makes no code change.

## Why these choices
Healer is scoped to `regression` alone, and nothing else, because the other three categories aren't things a blind, error-data-only fix can safely touch: a `persistent-failure` has already failed before, so a locator tweak is unlikely to be the real fix; a `new` scenario has no "previously passing" baseline to heal back to; and an `undefined/never-implemented` scenario is missing a step definition entirely — writing one from scratch is a design decision that belongs to Script Generator, not a "small, targeted fix" this agent is built to make.

Checking `git status` before touching anything exists so a fix never lands on top of someone else's uncommitted, half-finished work — if the tree isn't clean, this agent has no way to know whether it's about to fix the actual regression or paper over something a person was already in the middle of changing.

Never re-running tests to verify its own fix is deliberate, not an oversight: verification is supposed to happen on the next real test run, read by Test Result Analyzer, the same way any other change to the suite gets checked — an agent grading its own fix would undermine the same separation-of-concerns the rest of the pipeline is built around.
