# Navigation Locators — ZincBank

Base URL: `https://zincbank.cydeo.io`

Locator pattern (confirmed from live page for Dashboard): the nav tabs render as
`<span class="hidden sm:inline">TabName</span>`. Same selector shape applies to
all five tabs — only the visible text changes.

| Tab | Label Text | Locator | Destination URL |
|---|---|---|---|
| Dashboard | Dashboard | `span.hidden.sm\\:inline:has-text("Dashboard")` | `/dashboard` — **CONFIRM** |
| Accounts | Accounts | `span.hidden.sm\\:inline:has-text("Accounts")` | `/accounts` — confirmed |
| Move Money | Move Money | `span.hidden.sm\\:inline:has-text("Move Money")` | `/move-money` — **CONFIRM** |
| Transactions | Transactions | `span.hidden.sm\\:inline:has-text("Transactions")` | `/transactions` — **CONFIRM** |
| Cards | Cards | `span.hidden.sm\\:inline:has-text("Cards")` | `/cards` — **CONFIRM** |

## Playwright locator syntax (for reference)

```ts
page.locator('span.hidden.sm\\:inline', { hasText: 'Dashboard' })
page.locator('span.hidden.sm\\:inline', { hasText: 'Accounts' })
page.locator('span.hidden.sm\\:inline', { hasText: 'Move Money' })
page.locator('span.hidden.sm\\:inline', { hasText: 'Transactions' })
page.locator('span.hidden.sm\\:inline', { hasText: 'Cards' })
```

## Open items — verify before handing this to Script Generator

- Only `/accounts` has been confirmed against the live page (you gave that one directly). The other four URL paths above are my best guess based on the tab names — I have not seen them on the page, so don't treat them as real until you click through and check the actual URL bar for each.
- Tab labels are pulled from your notes on this build (Dashboard, Accounts, Move Money, Transactions, Cards) — worth a quick visual double-check that the on-page text matches exactly (e.g. "Move Money" vs. "Transfer" or similar), since Script Generator will match on that exact string.
