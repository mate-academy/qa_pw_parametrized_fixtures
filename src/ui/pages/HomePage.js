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

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async goToHomePage() {
    await this.step(`Go to Home tab`, async () => {
      await this.page.goto('');
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await this.step(`Assert the article is visible`, async () => {
      const articleTitleHeader = this.page.getByText(title).first();
      await expect(articleTitleHeader).toBeVisible();
    });
  }

  async assertArticleDescriptionIsVisible(description) {
    await this.step(`Assert the article has correct text`, async () => {
      const articleTitleDescription = this.page.getByText(description);
      await expect(articleTitleDescription).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await this.step(
        `Assert the article has correct author username`, 
        async () => {
      const authorUsername = this.page.getByRole('link', { name: username })
      await expect(authorUsername).toBeVisible();
    });
  }
}
