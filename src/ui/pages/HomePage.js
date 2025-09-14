import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    //this.globalFeed = page.getByText('Global Feed');
  }

  async open() {
    await this.step(`Open home page`, async () => {
      await this.page.goto('/');
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

  async assertAuthorsVisible(authors) {
    for (const author of authors) {
      await expect(this.page.getByRole('link', { name: author })).toBeVisible();
    }
  }

  async openYourFeed() {
    await this.yourFeedTab.click();
  }
}
