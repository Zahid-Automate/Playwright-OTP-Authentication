import { Page } from "@playwright/test";

export class LoginPage {
  constructor(Page) {
    this.page = Page;
    this.username = this.page.locator('[data-test="email"]');
    this.password = this.page.locator('[data-test="password"]');
    this.submit = this.page.locator('[data-test="login-submit"]');
    this.navMenu = this.page.locator('[data-test="nav-menu"]');
    this.navSignOut = this.page.locator('[data-test="nav-sign-out"]');
    this.navSignIn = this.page.locator('[data-test="nav-sign-in"]');
    this.totp = this.page.locator("#totp");
    this.verifyTotp = this.page.locator('[data-test="verify-totp"]');
  }

  async goto() {
    await this.page.goto("/auth/login");
  }

  async login(email, password) {
    await this.goto();
    await this.username.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
}
