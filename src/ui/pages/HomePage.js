import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.articlePreview = page.locator('.article-preview');
    this.articlePreviewTitle  = this.articlePreview.locator('h1');
  }

  async open() {
    await this.step(`Open the home page`, async () => {
      await this.page.goto('/');
    });
  }

  async assertArticleTitlesAreVisibleInTheFeed(articles) {
    await this.step(`Assert articles are visible in the feed`, async () => {
      for (const article of articles) {
        const title = this.articlePreviewTitle.filter({ hasText: article });
        await expect(title).toBeVisible();
      }
    });
  }

  async clickYourFeedTab() {
    await this.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
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

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }
}
