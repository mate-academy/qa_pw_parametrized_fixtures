import { expect, testStep } from '../../common/pwHelpers/pw';

export class ProfilePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open(username) {
    await this.step(`Open '${username}' profile`, async () => {
      await this.page.goto(`/profile/${username}`);
    });
  }

  async followUser(username) {
    await this.step(`Follow '${username}'`, async () => {
      const followButton = this.page.getByRole('button', {
        name: `Follow ${username}`,
      });

      await followButton.click();
      await expect(
        this.page.getByRole('button', { name: `Unfollow ${username}` }),
      ).toBeVisible();
    });
  }
}
