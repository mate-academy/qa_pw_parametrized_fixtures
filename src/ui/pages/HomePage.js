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

  articleTitleLinkInTabs(title) {
    return this.page.getByRole('heading', { name: title });
  }

  readMoreLinkInArticlePreview(title) {
    return this.page
      .getByRole('link', { name: title })
      .getByText('Read more...');
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

  async clickGlobalFeedTab() {
    await this.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async clickReadMoreLinkInArticlePreview(title) {
    await this.step(
      `Click the 'Read more...' link in article preview`,
      async () => {
        await this.readMoreLinkInArticlePreview(title).click();
      },
    );
  }

  async assertArticleIsVisibleInYourFeed(title) {
    await this.step(
      `Assert the article is visible in the 'Your Feed'`,
      async () => {
        await expect(this.articleTitleLinkInTabs(title)).toContainText(title);
      },
    );
  }
}
