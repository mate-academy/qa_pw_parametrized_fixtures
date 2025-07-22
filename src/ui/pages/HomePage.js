import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.articlesList = page.locator('.article-preview');
    this.articleTitle = page.locator('a.preview-link h1');
    this.articleDescription = page.locator('a.preview-link p');
    this.articleTags = page.locator('ul.tag-list > li');
    this.emptyState = page.getByText('No articles are here... yet.');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }
  async clickYourFeedTab() {
    await this.step(`Click on the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickGlobalFeedTab() {
    await this.step(`Click on the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async getArticleByAuthor(authorName, index = 0) {
    return await this.step('Find Article in Feed by Author', async () => {
      const article = this.articlesList
        .filter({ has: this.page.locator('.author', { hasText: authorName }) })
        .nth(index);
      return article;
    });
  }

  async assertArticleTitleContainsText(authorName, index = 0, title) {
    await this.step(
      `Article 'Title' of Author ${authorName} is shown`,
      async () => {
        const article = await this.getArticleByAuthor(authorName, index);
        await expect(article.locator('h1')).toContainText(title);
      },
    );
  }

  async assertArticleDescriptionContainsText(
    authorName,
    index = 0,
    description,
  ) {
    await this.step(
      `Article 'Description' pf Author ${authorName}  is shown`,
      async () => {
        const article = await this.getArticleByAuthor(authorName, index);
        await expect(article.locator('p')).toContainText(description);
      },
    );
  }

  async assertEmptyStateIsVisible() {
    await this.step(`Assert check 'No articles..' empty state`, async () => {
      await expect(this.emptyState).toBeVisible();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }
}
