import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeed = page.getByText('Global Feed', { exact: true });
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

  async openGlobalFeed() {
    await this.step(`Open Global Feed`, async() => {
      await this.globalFeed.click();
    });
  }

   async assertArticleTitleIsVisible(title) {
    await this.step(`Assert the article has correct title`, async () => {
      await expect(this.page.locator('h1').filter( {hasText : title} )).toContainText(title);
    });
  }

  async assertArticleAuthorNameIsVisible(title, username) {
  await this.step(`Assert article has correct author`, async () => {
    const article = this.page.locator('.article-preview').filter({
      has: this.page.getByRole('heading', { name: title }),
    });

    await expect(article.locator('a.author')).toHaveText(username);
  });
}

}
