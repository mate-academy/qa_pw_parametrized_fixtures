import { expect, testStep } from '../../../common/pwHelpers/pw';

export class SignUpPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.usernameField = page.getByPlaceholder('Username');
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('Password');
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Sign Up' page`, async () => {
      await this.page.goto('/user/register');
    });
  }

  async fillUsernameField(username) {
    await this.step(`Fill the 'Username' field`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillEmailField(email) {
    await this.step(`Fill the 'Email' field`, async () => {
      await this.emailField.fill(email);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickSignUpButton() {
    await this.step(`Click the 'Sign up' button`, async () => {
      await this.signUpButton.click();
    });
  }

  async submitSignUpForm(user) {
    await this.step(`Fill the 'Sign up' form`, async () => {
      await this.fillUsernameField(user.username);
      await this.fillEmailField(user.email);
      await this.fillPasswordField(user.password);
      await this.clickSignUpButton();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
