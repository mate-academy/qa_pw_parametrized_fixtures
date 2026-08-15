import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async clickYourFeedTab() {
    await this.step(`Navigate to 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async assertArticleIsVisibleInHomeFeed(title, username) {
    const stepName = `Assert the article '${title}' by '${username}' is visible in Home Feed`;
    await this.step(stepName, async () => {
      const articlePreview = this.page
        .locator('.article-preview')
        .filter({ hasText: title })
        .filter({ hasText: username });
      await expect(articlePreview).toBeVisible();
    });
  }
}
