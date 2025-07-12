import { expect, testStep } from '../../common/pwHelpers/pw'

export class UserProfilePage {

  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.followUserButton = page.getByRole('button', { name: 'Follow' });
    this.unfollowUserButton = page.getByRole('button', { name: 'Unfollow' });
  }

  async openUserProfilePage(userProfileLink) {
    await this.step('Open profile user page', async () => {
      const clearUrlPart = userProfileLink.replace(
        'https://conduit.mate.academy/profile/', ''
      );
      await this.page.goto(`/profile/${clearUrlPart}`);
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }
  
  async clickFollowButton() {
    await this.step('Click follow user button', async () => {
      await this.followUserButton.click();
    });
  }

  async assertUnfollowButtonIsVisible() {
    await this.step('Assert unfollow button visible', async () => {
      await expect(this.unfollowUserButton).toBeVisible();
    });
  }
}
