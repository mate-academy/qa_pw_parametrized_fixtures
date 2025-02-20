import { testStep } from '../../../common/pwHelpers/pw';

export class SettingsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.logOutButton = page.getByRole('button', {
      name: 'Or click here to logout.',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Sign Up' page`, async () => {
      await this.page.goto('/settings');
    });
  }

  async clickLogOutButton() {
    await this.step(`Click the 'Or click here to logout.' button`, async () => {
      await this.logOutButton.click();
    });
  }
}
