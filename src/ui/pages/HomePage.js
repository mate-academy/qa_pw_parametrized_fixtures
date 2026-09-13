import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.homeButton = page.getByRole('link', { name: 'Home' });
    this.settingsButton = page.getByRole('link', { name: '  Settings' });
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

  articleAuthorLinkInFeed(username, articleTitle) {
    return this.page
      .locator('.article-preview', { hasText: articleTitle })
      .getByRole('link', { name: username, exact: true });
  }

  articleTitleHeadingInFeed(title) {
    return this.page
      .locator('.article-preview', { hasText: title })
      .getByRole('heading', { name: `Article title: ${title}`, exact: true });
  }
  async clickHomeButton() {
    await this.step('Click on "Home" Button', async () => {
      await this.homeButton.click();
    });
  }
  async clickSettingsButton() {
    await this.step('Click on "Settings" Button', async () => {
      await this.settingsButton.click();
    });
  }
  async assertArticleAuthorLinkInFeedIsVisible(username, articleTitle) {
    await this.step(
      `Assert the article author link is visible in feed`,
      async () => {
        await expect(
          this.articleAuthorLinkInFeed(username, articleTitle),
        ).toBeVisible();
      },
    );
  }

  async assertArticleTitleHeadingInFeedIsVisible(title) {
    await this.step(
      `Assert the 'Article Title in feed' is visible`,
      async () => {
        await expect(this.articleTitleHeadingInFeed(title)).toBeVisible();
      },
    );
  }

  async assertArticleTitleHeadingInFeedNotVisible(title) {
    await this.step(
      `Assert the 'Article Title in feed' is Not visible`,
      async () => {
        await expect(this.articleTitleHeadingInFeed(title)).toBeHidden();
      },
    );
  }
}
