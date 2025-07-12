import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.profileButton = page.locator('//img[@alt="your profile image"]');
  }

  async open() {
    await this.step(`Open home page`, async () => {
      await this.page.goto('/');
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickProfileButton() {
    await this.step(`Click the profile button`, async () => {
      await this.profileButton.click();
    });
  }
  async assertArticleIsVisible(articleName) {
    await this.step('Assert article is visible', async () => {
      await expect(this.page.getByRole('link').filter(
        { hasText: `Article title: ${articleName}` }
      ).first()).toBeVisible();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }
}
