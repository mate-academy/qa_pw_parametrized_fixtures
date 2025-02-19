import { expect, test } from '@playwright/test';

export class SignUpPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.getByPlaceholder('Username');
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('Password');
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async open() {
    await test.step(`Open 'Sign Up' page`, async () => {
      await this.page.goto('/user/register');
    });
  }

  async fillUsernameField(username) {
    await test.step(`Fill the 'Username' field`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillEmailField(email) {
    await test.step(`Fill the 'Email' field`, async () => {
      await this.emailField.fill(email);
    });
  }

  async fillPasswordField(password) {
    await test.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickSignUpButton() {
    await test.step(`Click the 'Sign up' button`, async () => {
      await this.signUpButton.click();
    });
  }

  async submitSignUpForm(user) {
    await test.step(`Fill the 'Sign up' form`, async () => {
      await this.fillUsernameField(user.username);
      await this.fillEmailField(user.email);
      await this.fillPasswordField(user.password);
      await this.clickSignUpButton();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
