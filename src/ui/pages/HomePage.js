import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed', { exact: true });
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.openGlobalFeed = page.getByText('Global Feed', { exact: true });
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

  async goToGlobalFeed() {
    await this.step(`Open 'Global feed' page`, async () => {
      await this.openGlobalFeed.click();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await this.step(`Assert the article has correct title`, async () => {
      await expect(
        this.page.getByRole('heading', { name: title }),
      ).toContainText(title);
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await this.step(`Assert the article has correct author username`,
      async () => {
        await expect(
          this.page.getByRole('link', { name: username }).first(),
        ).toBeVisible();
      },
    );
  };
}    
