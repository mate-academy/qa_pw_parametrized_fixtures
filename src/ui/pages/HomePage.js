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
  async assertYourFeedTabIsActive() {
    await this.step(`Assert the 'Your Feed' tab is active`, async () => {
      await expect(this.yourFeedTab).toHaveClass(/active/);
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
  findArticleByTitle(title) {
    return this.page.locator('.article-preview').filter({ hasText: title });
  }
  async clickArticleByTitle(title) {
    await this.step(`Click article '${title}'`, async () => {
      await this.findArticleByTitle(title).locator('.preview-link').click();
    });
  }
  async clickGlobalFeedTab() {
    await this.step(`Open a 'Global feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }
  async assertGlobalFeedTabIsActive() {
    await this.step(`Assert the 'Global Feed' tab is active`, async () => {
      await expect(this.globalFeedTab).toHaveClass(/active/);
    });
  }

  async assertArticleIsVisible(title) {
    await this.step(
      `Assert the article is visible in the 'Your Feed' tab`,
      async () => {
        await expect(this.findArticleByTitle(title)).toBeVisible();
      },
    );
  }
}
