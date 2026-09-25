# Locator Reference — ZincBank Login

URL: https://zincbank.cydeo.io/login

| Element | Playwright Locator | Notes |
|---|---|---|
| Email field | `page.getByPlaceholder('you@example.com')` | type="email", no separate visible label |
| Password field | `page.locator('input[type="password"]')` | accessible name "Password"; not confirmed whether this comes from a real `<label>` or an `aria-label` |
| Sign in button | `page.getByRole('button', { name: 'Sign in' })` | type="submit" |
| Open an account link | `page.getByRole('link', { name: 'Open an account' })` | href="/apply" |