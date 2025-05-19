import { expect, testStep } from '../../../common/pwHelpers/pw';

export class ViewArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.editButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username }).first();
  }

  tagListItem(tagName) {
    return this.page.getByRole('listitem').filter({ hasText: tagName });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await this.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async assertArticleTitleIsVisible(title) {
    await this.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await this.step(
      `Assert the article has correct author username`,
      async () => {
        await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
      },
    );
  }

  async assertArticleTextIsVisible(text) {
    await this.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleTagsAreVisible(tags) {
    await this.step(`Assert the article has correct tags`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await expect(this.tagListItem(tags[i])).toBeVisible();
      }
    });
  }

  async clickEditArticleLink() {
    await this.editButton.click();
  }

  clickFollowAuthorButton(username) {
    return this.step(`Click follow author button`, async () => {
      const button = this.page
        .locator('button', { hasText: 'Follow ' + username })
        .first();
      await button.click();
    });
  }
}
