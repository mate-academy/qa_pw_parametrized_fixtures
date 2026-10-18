import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.homePageButton = page.getByRole('link', { name: 'Home' });
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
    await this.step(`Click 'Your Feed'`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickHomePageButton() {
    await this.step(`Click 'Home Page'`, async () => {
      await this.homePageButton.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleIsVisible(title) {
    await this.step(`Assert the article is visible`, async () => {
      await expect(
        this.page.getByRole('link', { name: `Article title: ${title}` }),
      ).toBeVisible();
    });
  }
}
