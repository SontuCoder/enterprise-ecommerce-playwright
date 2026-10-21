# Enterprise E-Commerce Playwright Automation — Project Plan

> **Status:** Planning · **Owner:** You · **Version:** 1.0 · **Date:** 2026-10-21  
> **Application under test (AUT):** https://ecommerce-playground.lambdatest.io/  
> **Project type:** Portfolio-grade web UI automation framework built from scratch

## 1. Project objective

Build and maintain a scalable **Playwright + TypeScript** test automation framework for the **LambdaTest E-Commerce Playground**. Cover the customer journey from account access through product discovery, wishlist/compare, shopping cart, and checkout, then run automated suites locally and on **TestMu AI Cloud**, publish evidence, and add CI/CD.

**You will write the implementation yourself.** This file defines scope, sequence, acceptance criteria, and test scenarios—not ready-made test scripts.

### Success criteria

- [ ] A maintainable framework using Page Object Model (POM), reusable components, and Playwright fixtures.
- [ ] At least **60 automated scenarios** across positive, negative, and end-to-end workflows (a **76-scenario candidate backlog** is below).
- [ ] Repeatable local Chromium suite plus cross-browser checks where supported.
- [ ] Cloud smoke suite executing on TestMu AI, with verifiable build/session evidence.
- [ ] HTML and JSON reports, screenshots on failure, traces on retry, and useful test steps.
- [ ] GitHub repository with setup instructions, no committed credentials, and CI automation.
- [ ] Tests that are independent, deterministic wherever practical, and safe to rerun.

### Out of scope initially

- Real payments, live orders with financial charges, external email delivery verification, load/performance benchmarking, penetration testing, and testing third-party sites.
- Features **not actually supported** by the live playground. Treat any unverified scenario as a candidate until you inspect the UI.

## 2. Application reconnaissance (do this before coding)

Explore the live application manually and record findings:

- [ ] Discover available account flows: registration, login, logout, password recovery, account details, address book.
- [ ] Discover catalog capabilities: categories, search, sort, filter, pagination, product variants.
- [ ] Discover wishlist, product comparison, and cart behavior for guest and signed-in users.
- [ ] Discover checkout paths: guest/registered, delivery, shipping, payment selections, order confirmation.
- [ ] Record exact error messages and field-validation rules rather than guessing them.
- [ ] Check whether the site allows creating disposable test accounts and placing nonfinancial test orders.
- [ ] Confirm all flows work with TestMu AI cloud browsers, not just locally.
- [ ] Identify stateful data (accounts, stock, cart, saved addresses) that could make parallel tests unreliable.

**Observed on the public site:** search, product listings, shopping cart, wishlist actions, catalog sorting, and product comparison entry points. Registration and advanced checkout behavior should still be investigated hands-on before writing expectations.

**Reconnaissance deliverable:** `docs/application-notes.md` with workflows, validations, selectors/roles, test-data constraints, and unsupported features.

## 3. Business process map

```text
START
  |
  v
Open Storefront
  |
  +--> Guest --------------------------------------+
  |                                               |
  +--> Register / Login --> Account Access --------+
                                                  |
                                                  v
                                          Browse or Search
                                                  |
                                          Filter / Sort Products
                                                  |
                                          Open Product Details
                                                  |
                              +-------------------+------------------+
                              |                   |                  |
                              v                   v                  v
                           Wishlist           Compare            Add to Cart
                              |                   |                  |
                              +-------------------+------------------+
                                                  |
                                             Review Cart
                                                  |
                                            Update Quantity
                                                  |
                                              Checkout
                                                  |
                                       Enter Required Details
                                                  |
                                         Review Order & Total
                                                  |
                                         Confirm (if supported)
                                                  |
                                         Verify Confirmation
                                                  |
                                                 END
```

**Alternative/negative paths:** invalid credentials, missing input, empty search, no results, unavailable products/options, invalid quantities, canceled checkout, session expiration, and validation errors.

## 4. Functional test backlog — 76 candidate scenarios

Mark each scenario **Supported**, **Unsupported**, or **Needs Investigation** after manual reconnaissance. Prioritize stable behaviors and avoid assertions based on assumed site behavior.

### A. Authentication & registration (AUTH) — 10

| ID | Scenario | Priority |
|---|---|---|
| AUTH-01 | Register a new valid customer using unique test data | P0 |
| AUTH-02 | Registration with all required fields blank | P0 |
| AUTH-03 | Invalid email format is rejected | P1 |
| AUTH-04 | Password confirmation mismatch is rejected | P1 |
| AUTH-05 | Existing email registration behavior | P1 |
| AUTH-06 | Valid account login | P0 |
| AUTH-07 | Invalid password login | P0 |
| AUTH-08 | Empty login credentials | P1 |
| AUTH-09 | Logout ends the authenticated session | P0 |
| AUTH-10 | Password recovery form validation, if supported | P2 |

### B. Search (SEARCH) — 8

| ID | Scenario | Priority |
|---|---|---|
| SEARCH-01 | Search by exact product name | P0 |
| SEARCH-02 | Search by partial product name | P0 |
| SEARCH-03 | Unknown keyword produces a no-results state | P1 |
| SEARCH-04 | Empty search submission behavior | P1 |
| SEARCH-05 | Search case sensitivity behavior | P2 |
| SEARCH-06 | Search within selected category, if supported | P1 |
| SEARCH-07 | Search from the home page header | P0 |
| SEARCH-08 | Open the correct product from search results | P0 |

### C. Catalog, categories & sorting (CAT) — 9

| ID | Scenario | Priority |
|---|---|---|
| CAT-01 | Navigate into a product category | P0 |
| CAT-02 | Verify listed products have names and prices | P0 |
| CAT-03 | Sort names A to Z | P1 |
| CAT-04 | Sort names Z to A | P1 |
| CAT-05 | Sort price low to high | P0 |
| CAT-06 | Sort price high to low | P0 |
| CAT-07 | Change items per page, if supported | P1 |
| CAT-08 | Navigate between catalog pages | P1 |
| CAT-09 | Apply and clear a supported catalog filter | P1 |

### D. Product details (PDP) — 7

| ID | Scenario | Priority |
|---|---|---|
| PDP-01 | Product detail title matches listing | P0 |
| PDP-02 | Product price matches listing, accounting for displayed options | P1 |
| PDP-03 | Product image(s) appear | P2 |
| PDP-04 | Product description/specifications appear when present | P2 |
| PDP-05 | Select an available product option, if present | P1 |
| PDP-06 | Validate required product options, if present | P1 |
| PDP-07 | Add a product from its detail page to cart | P0 |

### E. Wishlist (WISH) — 6

| ID | Scenario | Priority |
|---|---|---|
| WISH-01 | Add a product to wishlist while signed in | P0 |
| WISH-02 | Wishlist displays correct product | P0 |
| WISH-03 | Add multiple distinct wishlist items | P1 |
| WISH-04 | Remove an item from wishlist | P1 |
| WISH-05 | Wishlist persists after navigating away/back | P1 |
| WISH-06 | Guest wishlist behavior follows application rules | P2 |

### F. Product comparison (CMP) — 5

| ID | Scenario | Priority |
|---|---|---|
| CMP-01 | Add two products to comparison | P1 |
| CMP-02 | Compare page shows both selected products | P1 |
| CMP-03 | Comparison reflects the correct product names/prices | P1 |
| CMP-04 | Remove a compared product | P2 |
| CMP-05 | Comparison state behaves correctly after navigation | P2 |

### G. Shopping cart (CART) — 9

| ID | Scenario | Priority |
|---|---|---|
| CART-01 | Add a single product to cart | P0 |
| CART-02 | Add multiple distinct products | P0 |
| CART-03 | Cart displays correct product names | P0 |
| CART-04 | Header cart badge/count updates | P0 |
| CART-05 | Increase product quantity | P0 |
| CART-06 | Decrease/change product quantity according to UI rules | P1 |
| CART-07 | Remove a product from cart | P0 |
| CART-08 | Cart subtotal matches displayed quantities and unit prices | P0 |
| CART-09 | Empty cart displays the expected empty state | P1 |

### H. Checkout (CHECKOUT) — 10

| ID | Scenario | Priority |
|---|---|---|
| CHECKOUT-01 | Proceed to checkout from populated cart | P0 |
| CHECKOUT-02 | Guest checkout path, if supported | P1 |
| CHECKOUT-03 | Logged-in checkout path, if supported | P0 |
| CHECKOUT-04 | Required billing fields validation | P0 |
| CHECKOUT-05 | Invalid email/phone/address input validation where applicable | P1 |
| CHECKOUT-06 | Select a supported shipping method | P1 |
| CHECKOUT-07 | Select a supported payment method without actual payment | P1 |
| CHECKOUT-08 | Verify product, quantity, and subtotal at order review | P0 |
| CHECKOUT-09 | Verify displayed order total, including any shipping/tax | P0 |
| CHECKOUT-10 | Confirm a nonfinancial demo order and verify success, **only if safe and supported** | P0 |

### I. Account management (ACCOUNT) — 6

| ID | Scenario | Priority |
|---|---|---|
| ACCOUNT-01 | Open account dashboard after login | P1 |
| ACCOUNT-02 | Update editable profile information | P1 |
| ACCOUNT-03 | Validate required profile fields | P1 |
| ACCOUNT-04 | Add an address-book entry, if supported | P2 |
| ACCOUNT-05 | Edit or delete a test address, if supported | P2 |
| ACCOUNT-06 | Verify account-only page access after logout | P0 |

### J. Navigation & responsive UI (NAV) — 6

| ID | Scenario | Priority |
|---|---|---|
| NAV-01 | Main navigation opens expected destination | P1 |
| NAV-02 | Logo returns user to home page | P1 |
| NAV-03 | Breadcrumbs navigate to expected category | P2 |
| NAV-04 | Store header and cart are usable at mobile viewport | P1 |
| NAV-05 | Primary menu works at tablet viewport | P2 |
| NAV-06 | Browser back/forward preserves sensible navigation state | P2 |

**Candidate total: 10 + 8 + 9 + 7 + 6 + 5 + 9 + 10 + 6 + 6 = 76.** Replace unsupported scenarios rather than writing tests that assert nonexistent functionality.

## 5. High-value end-to-end journeys

These journeys combine the modules above; implement as separate E2E tests only after underlying page objects and focused tests are reliable.

1. **Registered purchase journey:** Register/login → search → product details → cart → checkout → confirmation (when safe).
2. **Guest shopping journey:** Browse categories → sort by price → select product → add to cart → guest checkout (if supported).
3. **Comparison decision journey:** Search → compare two products → inspect details → choose → cart.
4. **Wishlist conversion journey:** Login → wishlist products → return later → add chosen product to cart (if supported).
5. **Negative checkout journey:** Add item → checkout → blank/invalid required fields → errors displayed → correct data → proceed.
6. **Multi-item order validation:** Add two products → change quantities → verify subtotal → checkout review → validate order total.

## 6. Framework design

### Technology stack

| Layer | Choice | Responsibility |
|---|---|---|
| Language | TypeScript | Typed automation code |
| Runner | `@playwright/test` | Fixtures, assertions, parallelism, browser projects |
| Pattern | Page Object Model + reusable components | Keep selectors/actions out of test logic |
| Test data | TypeScript/JSON factories | Reusable and unique data |
| Configuration | `.env` locally, CI secrets remotely | URLs, TestMu AI credentials, environment selection |
| Reports | Playwright HTML + JSON | Test execution results and artifacts |
| Cloud | TestMu AI Playwright connection | Hosted browser execution and session evidence |
| CI/CD | GitHub Actions | Lint/typecheck/test/upload artifacts |

### Proposed repository structure

```text
enterprise-ecommerce-playwright/
├── .github/
│   └── workflows/
│       ├── playwright-local.yml
│       └── playwright-cloud-smoke.yml
├── docs/
│   ├── application-notes.md
│   ├── test-strategy.md
│   ├── defect-log.md
│   └── cloud-evidence.md
├── pages/
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── RegisterPage.ts
│   ├── AccountPage.ts
│   ├── SearchResultsPage.ts
│   ├── CategoryPage.ts
│   ├── ProductDetailsPage.ts
│   ├── WishlistPage.ts
│   ├── ComparePage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── components/
│   ├── HeaderComponent.ts
│   ├── NavigationComponent.ts
│   ├── ProductCardComponent.ts
│   └── FooterComponent.ts
├── fixtures/
│   ├── base.fixture.ts
│   └── cloud.fixture.ts
├── helpers/
│   ├── dataFactory.ts
│   ├── priceHelper.ts
│   └── testmuSessionHelper.ts
├── test-data/
│   ├── products.json
│   └── checkoutProfiles.json
├── tests/
│   ├── auth/
│   ├── search/
│   ├── catalog/
│   ├── product/
│   ├── wishlist/
│   ├── compare/
│   ├── cart/
│   ├── checkout/
│   ├── account/
│   ├── navigation/
│   └── e2e/
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
├── Planned.md
└── README.md
```

**Design rules**

- Use Playwright's **built-in `page`, `context`, and `browser` fixtures** for normal tests. Do **not** manually launch/close a browser in every test.
- Define reusable locators and actions in page/component classes; keep assertions in tests unless an assertion is intrinsic to a helper's documented contract.
- Prefer role, label, placeholder, and text locators over brittle XPath/absolute CSS.
- Use `expect` with auto-retry; avoid hard-coded `waitForTimeout()`.
- Give each test independent data, session, and cleanup. Avoid tests depending on execution order.
- Use `test.step()` for readable business-action logging.
- Tag tests (for example `@smoke`, `@regression`, `@negative`, `@e2e`, `@cloud`) to select suites.
- Do not use `test.only()` in committed code.
- For data that can change (prices, stock), assert stable invariants and calculate totals from current UI state.

## 7. Configuration and execution strategy

### Local environment

- [ ] Initialize npm and install `@playwright/test`, TypeScript/Node types, and `dotenv` as needed.
- [ ] Create `playwright.config.ts` with `testDir: './tests'`, `testMatch: '**/*.test.ts'`.
- [ ] Add browser projects: Chromium first, then Firefox and WebKit.
- [ ] Set `baseURL` from environment with a safe fallback.
- [ ] Start with `workers: 1` while debugging stateful test cases; scale up only once tests are independent.
- [ ] Use retries primarily for CI diagnostics, not to hide failing tests.
- [ ] Configure `screenshot: 'only-on-failure'`, `trace: 'on-first-retry'`, and video according to evidence needs.
- [ ] Configure reporters using **HTML `outputFolder`** and **JSON `outputFile`**.

### Example `.env.example` (placeholders only)

```dotenv
BASE_URL=https://ecommerce-playground.lambdatest.io/
RUN_ON_CLOUD=false
LT_USERNAME=REPLACE_ME
LT_ACCESS_KEY=REPLACE_ME
```

Add `.env`, `node_modules/`, `test-results/`, and generated reports to `.gitignore`. **Never commit `.env` or access keys.** Use GitHub Actions secrets in CI.

### Cloud integration (TestMu AI)

- [ ] Create a cloud-specific Playwright fixture/project using TestMu AI's currently documented Playwright connection method.
- [ ] Use credentials loaded from `.env` for **local development only**.
- [ ] Keep a local default path that does not require cloud credentials.
- [ ] Configure a meaningful build name, test name, browser version, and OS.
- [ ] Ensure cloud sessions are correctly marked passed/failed based on test outcome.
- [ ] Capture build ID, session ID, screenshot, logs, and video link where available.
- [ ] Start with a **small cloud smoke suite** to avoid consuming unnecessary cloud concurrency/minutes.
- [ ] Verify the same tests pass locally before expanding cloud coverage.

**Important:** Running `chromium.launch()` manually creates a local browser; a Playwright `projects` name alone does not start a cloud browser. Remote execution needs the actual TestMu AI connection/fixture.

### Suggested `package.json` script names

| Script name | Purpose |
|---|---|
| `test` | Run local default tests |
| `test:smoke` | Run tests tagged `@smoke` |
| `test:regression` | Run regression suite |
| `test:headed` | Debug visibly in local Chromium |
| `test:ui` | Interactive Playwright UI |
| `test:cloud` | Execute approved cloud suite |
| `report` | Open generated HTML report |
| `typecheck` | Run TypeScript compiler checks |

> Script names are the plan; implement actual commands after setting up the matching projects and fixtures.

## 8. Phased implementation roadmap

| Phase | Focus | Deliverable | Exit criterion |
|---|---|---|---|
| **0** | Manual reconnaissance and scope | Application notes, validated backlog | Supported workflows and rules documented |
| **1** | Base framework | Config, fixtures, project structure, reporters | One passing local test and HTML report |
| **2** | Account/auth | Login and registration page objects/tests | Auth smoke + negative tests stable |
| **3** | Catalog/search | Search, category, sort, product detail | Key product discovery checks pass |
| **4** | Wishlist/compare | Reusable product components and suites | Supported save/compare flows work |
| **5** | Cart | Multi-item interactions, totals, updates | Cart assertions independent/repeatable |
| **6** | Checkout | Input validation, order review, safe confirmation | E2E order journey passes where supported |
| **7** | Advanced framework | Data factories, tagging, isolation, cross-browser | Parallel runs stable on chosen suites |
| **8** | Cloud execution | TestMu AI project, cloud evidence | Cloud smoke test visible on dashboard |
| **9** | CI/CD and documentation | GitHub Actions, reports, README | PR pipeline runs and artifacts retained |

### Practical 6-week pacing (adjust freely)

- **Week 1:** Phases 0–1 (research, framework, first passing smoke test)
- **Week 2:** Phase 2 (registration/account/login)
- **Week 3:** Phases 3–4 (discovery, wishlist, comparison)
- **Week 4:** Phases 5–6 (cart, checkout, E2E)
- **Week 5:** Phase 7 (refactor, data-driven, browser matrix, reliability)
- **Week 6:** Phases 8–9 (TestMu AI, CI/CD, documentation and portfolio demo)

## 9. Test-data and cleanup plan

- [ ] Create unique registration emails (timestamp/UUID plus a controlled test domain where accepted).
- [ ] Distinguish **ephemeral** test accounts from a reusable **pre-existing** account.
- [ ] Never use real personal, financial, or production account data.
- [ ] Keep cart/wishlist data isolated per test and reset it when the application allows.
- [ ] Avoid concurrent updates to the same account; use separate accounts per parallel worker if necessary.
- [ ] Use generated test data rather than relying on one static email for every registration run.
- [ ] Capture cleanup limitations in documentation if there is no deletion API/UI.
- [ ] Treat checkout as a demo-only operation; do not submit financial details or incur charges.

## 10. Browser and execution matrix

| Suite | Local Chromium | Local Firefox | Local WebKit | TestMu AI Cloud |
|---|---|---|---|---|
| Critical smoke | Required | Target | Target | Required |
| Full regression | Required | Optional | Optional | Optional |
| High-value E2E | Required | Target | Target | Target |
| Responsive checks | Required | Optional | Optional | Target |

Run cross-browser tests only for scenarios verified to be supported. Use a small representative browser matrix first rather than multiplying all 76 test candidates across browsers immediately.

## 11. Reporting, defect management, and evidence

### Per local run

- [ ] Test count (passed, failed, skipped, flaky) and total duration.
- [ ] HTML report and JSON report available at configured paths.
- [ ] Screenshot/trace/video artifacts available based on configuration.
- [ ] Failure diagnostics identify expected vs actual behavior and locator/action.

### Per TestMu AI cloud run

- [ ] Build name and build ID.
- [ ] Session name and session ID.
- [ ] Browser, browser version, OS, and execution timestamp.
- [ ] Cloud session status, run logs, video, and evidence screenshot where available.
- [ ] Corresponding Git commit and test case ID.

### Defect format

Record `Bug ID`, `Test Case ID`, `Environment`, `Steps to Reproduce`, `Expected`, `Actual`, `Evidence`, `Severity`, and `Status` in `docs/defect-log.md` (or a Jira board if you choose to use one).

## 12. CI/CD delivery plan

1. Store the project on GitHub and use branches/pull requests for changes.
2. Configure GitHub Actions to install dependencies and browsers in CI.
3. Run lint/typecheck if configured, then a deterministic smoke suite on every PR.
4. Run the full local regression suite on main or on demand.
5. Upload HTML report, JSON result, and test artifacts even on failure.
6. Add an **optional**, permission/secret-controlled TestMu AI cloud-smoke workflow.
7. Keep cloud credentials in GitHub Actions Secrets, never in repository files or printed logs.
8. Publish a concise run summary with links to test artifacts and cloud build/session evidence.

## 13. Definition of Done

A scenario is **Done** only if:

- [ ] Preconditions and test data are documented.
- [ ] Playwright test is independent and has clear, meaningful assertions.
- [ ] Page object/component code is reusable and readable.
- [ ] No fixed sleeps are used to mask synchronization issues.
- [ ] Test passes locally on repeated runs (and appropriate browser projects).
- [ ] Failure produces actionable diagnostics.
- [ ] Code is committed with a clear test ID and reviewed where possible.

The **project is Done** when:

- [ ] 60+ supported test scenarios are automated and traceable to the backlog.
- [ ] Critical flows (auth, search, cart, checkout where supported) pass reliably.
- [ ] POM + Playwright fixtures + typed test data are in place.
- [ ] HTML/JSON reports and failure artifacts work.
- [ ] TestMu AI cloud smoke execution is visible with session evidence.
- [ ] GitHub Actions pipeline runs successfully and stores artifacts.
- [ ] README contains prerequisites, setup, local/cloud commands, suite selection, report instructions, limitations, and architecture overview.

## 14. First implementation checkpoint — your next 10 tasks

- [ ] **01.** Explore registration, search, catalog, compare, wishlist, cart, and checkout manually.
- [ ] **02.** Create the GitHub repository and add `README.md` and this `Planned.md`.
- [ ] **03.** Initialize Playwright with TypeScript.
- [ ] **04.** Set up `playwright.config.ts` with `baseURL`, one Chromium project, reporters, and artifacts.
- [ ] **05.** Add `.env.example`, `.env` locally, and secure `.gitignore` rules.
- [ ] **06.** Create `HeaderComponent`, `HomePage`, and `LoginPage`.
- [ ] **07.** Write **AUTH-08** (empty login validation) after confirming application behavior.
- [ ] **08.** Write **SEARCH-01** (exact-name search) using a product you verified exists.
- [ ] **09.** Add `@smoke` tags and run `npx playwright test --grep @smoke`.
- [ ] **10.** Open the Playwright HTML report and document what you learned.

**Milestone 1 target:** Two stable tests, three reusable page/component classes, one report, and one Git commit—then progressively increase scope.

---