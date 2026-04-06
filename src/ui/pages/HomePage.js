import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedTab = page.getByText('Global Feed');
  }

  async open() {
    await this.step(`Open 'Home' page`, async () => {
      await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    });
  }

  getArticleBlock(title) {
    return this.page.locator('.article-preview', { hasText: title });
  }
  getArticleTitleLink(title) {
    return this.getArticleBlock(title).locator('a.preview-link');
  }
  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }
  async assertArticleTitleInFeedIsVisible(title) {
    await this.step(`Assert the article title in feed is visible`, async () => {
      await expect(this.getArticleTitleLink(title)).toBeVisible();
    });
  }
  async clickArticleTitleInFeed(title) {
    await this.step(`Click the article title in feed`, async () => {
      await this.getArticleTitleLink(title).click();
    });
  }
  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }
  async assertGlobalFeedTabIsVisible() {
    await this.step(`Assert the 'Global Feed' tab is visible`, async () => {
      await expect(this.globalFeedTab).toBeVisible();
    });
  }
  async clickGlobalFeedTab() {
    await this.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }
  async clickYourFeedTab() {
    await this.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }
}
