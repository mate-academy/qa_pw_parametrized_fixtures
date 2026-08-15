import { test, expect } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.followButton = page.getByRole('button', { name: /Follow/ });
    this.unfollowButton = page.getByRole('button', { name: /Unfollow/ });
  }

  async openProfilePage(username) {
    await test.step(`Open profile page`, async () => {
      await this.page.goto(`/profile/${username}`);
    });
  }

  async clickFollowButton() {
    await test.step(`Click the 'Follow' button`, async () => {
      await this.followButton.click();
    });
  }

  async clickUnfollowButton() {
    await test.step(`Click the 'Unfollow' button`, async () => {
      await this.unfollowButton.click();
    });
  }

  async assertUnfollowButtonIsVisible() {
    await test.step(`Assert the 'Unfollow' button is visible`, async () => {
      await expect(this.unfollowButton).toBeVisible();
    });
  }

  async assertFollowButtonIsVisible() {
    await test.step(`Assert the 'Follow' button is visible`, async () => {
      await expect(this.followButton).toBeVisible();
    });
  }
}
