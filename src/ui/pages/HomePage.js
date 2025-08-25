import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Home' page`, async () => {
      await this.page.goto('');
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

  async assertGlobalFeedTabIsVisible() {
    await this.step(`Assert the 'Global Feed' tab is visible`, async () => {
      await expect(this.globalFeedTab).toBeVisible();
    });
  }

  async clickGlobalFeedTabButton() {
    await this.step(`Click the 'Global Feed' tab button`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertArticleOnGlobalFeedTabIsVisible(articleTitle, articleCreator) {
    const article = this.page.getByText(articleTitle);
    const creator = this.page.getByRole('link', { name: articleCreator }).first();

    await this.step(`Assert the '${articleTitle}' article is visible`, async () => {
      await expect.poll(async () => {
        await this.page.reload();
        await this.clickGlobalFeedTabButton();
        return await article.isVisible();
      }, {
        timeout: 15000,
        intervals: [500, 1000, 2000],
      }).toBe(true);
      await expect(creator).toBeVisible();
      await expect(article).toBeVisible();
    });
  }
}
