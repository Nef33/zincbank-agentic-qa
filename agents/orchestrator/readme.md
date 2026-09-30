# Orchestrator Agent

## What it does
Runs the test suite, reads what Test Result Analyzer and Self-Healing Test Healer have already produced, and tells the user exactly what to do next at each point in the pipeline. It never invokes another agent itself and never analyzes or fixes anything on its own — with this Cline setup keeping only one agent's `.clinerules` active at a time, Orchestrator's job is to be the pipeline's status line: run the tests, read the paper trail the other agents leave behind, and say in plain words which `.clinerules` to swap to next.

## Input
- Runs `npx cucumber-js` itself via the terminal to produce fresh results in `allure-results/`.
- Reads the latest report from `agents/test-result-analyzer/analysis/`.
- Reads the latest log from `agents/self-healing-test-healer/healing-log/`, once one exists.
- May run read-only git commands (e.g. `git status`) but never a command that writes to the repository.

## Output
- A short status message after each stage, naming exactly what just happened and what to do next (e.g. "Tests ran, 6 passed / 0 failed. Swap `.clinerules` to Test Result Analyzer and run it now.").
- A run log at `agents/orchestrator/run-log/<timestamp>.md` recording the sequence for that pipeline pass: when tests ran, what Test Result Analyzer reported, whether healing was triggered, and the outcome.

## Why these choices
This agent exists because the pipeline has no other coordinator — with one shared `.clinerules` file swapped by hand, nothing else tracks where a run actually is in the sequence, or notices when a report is stale relative to a fresher test run. Orchestrator's read-only relationship to the other agents' outputs is deliberate: it interprets and sequences, it doesn't second-guess Test Result Analyzer's categorization or attempt Self-Healing Test Healer's fix itself, since duplicating that judgment here would just create a second place for the two to disagree.

Refusing to invoke another agent directly isn't a technical limitation being worked around — it's the actual constraint of running one Cline agent at a time, made explicit rather than something Orchestrator quietly tries to paper over by attempting another agent's job itself.

The run log exists so a person picking the pipeline back up later (or auditing it after the fact) doesn't have to reconstruct the sequence of events from scattered analysis reports and healing logs — one place records what happened, and in what order, every time Orchestrator runs.
