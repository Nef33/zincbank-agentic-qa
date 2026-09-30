# Verification Report — Navigation

Feature files cross-checked against `docs/rtm-navigation.md`.

## Coverage

| Requirement ID | Test Case(s) | Coverage Status |
|---|---|---|
| REQ-NAV-001 | Navigate to the Dashboard page | Covered |
| REQ-NAV-002 | Navigate to the Accounts page | Covered |
| REQ-NAV-003 | Navigate to the Move Money page | Covered |
| REQ-NAV-004 | Navigate to the Transactions page | Covered |
| REQ-NAV-005 | Navigate to the Cards page | Covered |

## Gaps

None.

## Mismatches

None.

## Orphan Tags

None. Every `@REQ-NAV-*` tag in `features/navigation.feature` maps to a row in the RTM.

## Suggested-Scenarios File

`features/navigation-suggested.feature` carries no `@REQ-NAV-*` tags and remains correctly untagged. Its header explicitly states the scenarios are NOT RTM-backed.