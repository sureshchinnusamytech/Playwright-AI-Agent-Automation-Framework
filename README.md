# 🎭 AI-Driven Playwright Automation Framework

### 🎯 Objective

This project demonstrates an **AI-driven high-velocity automation strategy**. By leveraging a Playwright Agent, the core automation of this retail application was completed in just **3.5 hours**—an effort that traditionally spans **3 to 5 days**.

This framework serves as a proof of concept (PoC) for accelerating regression cycles and ensuring early detection of critical bugs through AI-assisted architecture.

While 95% of the code and test plans were autonomously produced by the playwright-test-planner and generator agents, manual intervention was applied to harden edge cases, such as refactoring AI-generated credentials to prevent account collision errors.etc.

### 🛠️ Challenges & Senior-Level Solutions

| Challenge                   | Impact                                                                                  | Architect's Solution                                                                                              |
| :-------------------------- | :-------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **Registration Collisions** | Agent has generated a random credential generation led to "user already exists" errors. | Agent failed to handle this scenario need manual intervention to fix this.                                        |
| **Hardcoded Locators**      | Initial AI output lacked POM structure, making the suite brittle.                       | Need manual intervention to refactor inline elements into a centralized **Page Object Model** for DRY compliance. |
| **Strict Mode Ambiguity**   | `getByText('Dress')` matched 16 elements, causing test timeouts.                        | Need manual intervention to update the locator and used `allTextContents()` for precise validation.               |

---

### 🏗️ Architecture Overview

The project follows a scalable, decoupled architecture designed for speed and long-term maintainability.

<p align="center">
  <img src="docs/ArchitectureDiagram.svg" alt="Automation Architecture" width="300">
</p>

- **NPM & package.json:** Manages the Node.js runtime environment and dependency lifecycle.
- **Playwright Config:** The "Global Command Center" for parallel execution, browser matrix, and reporting.
- **Playwright Agent:** Orchestrates AI-driven script generation and smart-healing locators.
- **Page Object Model (POM):** Decouples UI interactions from test logic for 100% reusability.
- **Test Suite:** TypeScript-based spec files covering end-to-end user journeys.

---

### 🧪 Key Automation Scenarios

- **User Registration Lifecycle:** Navigating the full flow from signup to session verification, including profile completion and address management.
- **User Login Flow:** Validating secure authentication and dashboard state verification.
- **Product Search & Filter:** Dynamic testing of search algorithms and multi-category filtering (Price/Brand).
- **Checkout Journey:** Validating cart persistence and the end-to-end transactional process through to order confirmation.
- **Data Cleanup:** Post-execution account deletion to ensure a clean user lifecycle and data privacy compliance.

---

### 🚀 Getting Started

**1. Prerequisites**

- Node.js (v18 or higher)
- npm (installed with Node.js)

**2. Installation**

```bash
# Clone the repository
git clone [https://github.com/sureshchinnusamytech/Playwright-AI-Agent-Automation-Framework.git](https://github.com/sureshchinnusamytech/Playwright-AI-Agent-Automation-Framework.git)

# Install dependencies
npm install

# Install Playwright Browsers
npx playwright install

# Execute test on Headed Mode: Opens the browser so you can watch the automation happen.
npx playwright test --headed


# Execute test on Headless Mode: Standard Run (Headless): Runs all tests in the background (default).
npx playwright test

# Execure test on UI Mode
npx playwright test --ui

# View HTML Report
npx playwright show-report

```
