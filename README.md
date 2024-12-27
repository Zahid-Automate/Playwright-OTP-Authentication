# Playwright Test: Login with 2FA

This repository contains an example of using Playwright to test a login flow with Two-Factor Authentication (2FA) enabled. The script demonstrates how to handle login credentials, generate OTP codes, and verify successful authentication using Playwright's robust testing framework.

## Prerequisites

Before running the tests, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Playwright](https://playwright.dev/) installed globally or as a project dependency

## Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/Zahid-Automate/Playwright-OTP-Authentication.git
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm init playwright@latest
   npm i dotenv
   npm install otpauth
   ```

3. Create a `.env` file in the project root to store environment variables:
   ```env
   PLAYWRIGHT_USERNAME=your-email@example.com
   PLAYWRIGHT_PASSWORD=your-password
   OTP_KEY=your-otp-key
   ```
You can get your OTP Key manually from https://it-tools.tech/otp-generator by using the OTP Key

## Running the Tests

Run the tests using the following command:

### On Unix-based Systems (macOS/Linux):
```bash
TEST_ENV=devNational npx playwright test login.2fa.spec.js
```

### On Windows Command Prompt:
```cmd
set TEST_ENV=devNational && npx playwright test login.2fa.spec.js
```

### On Windows PowerShell:
```powershell
$env:TEST_ENV="devNational"; npx playwright test login.2fa.spec.js
npx playwright test tests/auth/login.2fa.spec.js
```

## Test Workflow

1. Navigate to the login page using the `LoginPage` class.
2. Input the email and password to log in.
3. Generate a One-Time Password (OTP) using the `generateOTP` helper function.
4. Input the OTP and verify successful authentication.
5. Assert that the user menu displays the correct username after login.

## File Structure

```plaintext
├── helpers
│   └── otp.js          # Helper for OTP generation
├── pages
│   └── LoginPage.js    # LoginPage class abstraction
├── tests
│   └── login.2fa.spec.js # Playwright test for 2FA login
└── .env                # Environment variables (not included in repo)
```

## Example Code

Below is the main test script:

```javascript
import { generateOTP } from "../../helpers/otp";
import { LoginPage } from "../../pages/loginPage";
import { test, expect } from "@playwright/test";

test("Login with 2FA enabled", async ({ page }) => {
  const playwrightEmail = process.env.PLAYWRIGHT_USERNAME;
  const playwrightPassword = process.env.PLAYWRIGHT_PASSWORD;
  const otpKey = process.env.OTP_KEY;

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(playwrightEmail, playwrightPassword);

  const otpCode = generateOTP(otpKey);

  await loginPage.totp.fill(otpCode);
  await loginPage.verifyTotp.click();
  expect(await loginPage.navMenu.innerText()).toContain("Mohammed A Zahid");
})
```

## Troubleshooting

If you encounter issues:

1. Verify environment variables in the `.env` file.
2. Ensure dependencies are correctly installed by running `npm install`.
3. Check that the `TEST_ENV` variable is correctly set for your operating system.

## License

This project is licensed under the MIT License. Feel free to use and adapt it for your needs!

