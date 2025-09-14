import { expect, testStep } from '../../../common/pwHelpers/pw.js';

export class ProfilePage {
  constructor(page, userId = 0, username) {
    this.page = page;
    this.userId = userId;
    this.username = username;
    this.followBtn = page.getByRole('button', { name: /Follow/ });
  }

  async open() {
    await this.page.goto(`/profile/${this.username}`);
  }

  async clickFollowBtn() {
    await this.step(`Follow user ${this.username}`, async () => {
      await this.followBtn.click();
      await expect(
        this.page.getByRole('button', { name: 'Unfollow' }),
      ).toBeVisible({ timeout: 5000 });
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }
}
