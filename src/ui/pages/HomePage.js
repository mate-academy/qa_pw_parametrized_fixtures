import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  articlePreview(articleTitle) {
    return this.page.locator('.article-preview').filter({ hasText: articleTitle });
  }

  articleAuthorLink(username) {
    return this.page.locator('.author').getByText(username);
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

  async clickYourFeedTab() {
    await this.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickGlobalFeedTab() {
    await this.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleIsVisible(articleTitle) {
    await this.step(`Assert article '${articleTitle}' is visible`, async () => {
      await expect(this.articlePreview(articleTitle)).toBeVisible();
    });
  }

  async assertArticleAuthorIsVisible(articleTitle, username) {
    await this.step(
      `Assert article '${articleTitle}' has author '${username}'`,
      async () => {
        const articleElement = this.articlePreview(articleTitle);
        await expect(
          articleElement.locator('.author').getByText(username),
        ).toBeVisible();
      },
    );
  }
}
