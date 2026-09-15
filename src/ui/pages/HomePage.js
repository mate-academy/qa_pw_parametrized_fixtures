import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed', { exact: true });
    this.globalFeedTab = page.getByText('Global Feed', { exact: true });
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

  async assertArticleTitleIsVisible(title) {
    await this.step(
      `Assert article title '${title}' is visible on home feed`,
      async () => {
        await expect(
          this.page.getByRole('heading', { name: title }),
        ).toBeVisible();
      },
    );
  }
}
