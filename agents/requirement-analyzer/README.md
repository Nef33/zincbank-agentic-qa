# Requirement Analyzer Agent

## What it does
Takes a user story about a ZincBank feature and produces a Requirements Traceability Matrix (RTM) — nothing else. It doesn't write test cases or code.

## Input
A user story, given directly in the Cline chat.

## Output
A markdown table saved to `docs/rtm-login.md`, with columns: Requirement ID, Description, Priority, Test Case(s), Coverage Status.

## Why these choices
Not every requirement is High priority. Smoke-test coverage and critical functionality (like signing in at all) get High. Everything else is ranked by judgment — how often it's used, how bad it is if it breaks, that kind of thing.