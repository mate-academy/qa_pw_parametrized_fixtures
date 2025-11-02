import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  authorArticleItem(authorName) {
    return this.page.locator('.article-preview .author', { hasText: authorName });
  }

  titleArticleItem(title) {
    return this.page.locator('.article-preview h1', { hasText: title });
  }

  descriptionArticleItem(description) {
    return this.page.locator('.article-preview p', { hasText: description });;
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickYourFeed() {
    await this.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
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

  async assertArticleAuthorContainsAuthor(articleAuthor) {
    await this.authorArticleItem(articleAuthor).waitFor({state: 'visible'});
    await expect(this.authorArticleItem(articleAuthor)).toContainText(articleAuthor.toLowerCase());
  }

  async assertArticleTitleContainsTitle(articleTitle) {
    await expect(this.titleArticleItem(articleTitle)).toContainText(articleTitle);
  }
}
