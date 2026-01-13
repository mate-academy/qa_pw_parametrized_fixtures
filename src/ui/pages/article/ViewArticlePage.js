import { expect, testStep } from '../../../common/pwHelpers/pw';

export class ViewArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleTag = page.locator('.tag-list');
    this.editArticleButton = page.getByRole('link', { name: 'Edit Article' });
  }

  followAuthorButton(username) {
    return this.page
      .getByRole('button', { hasText: `Follow ${username}` })
      .first();
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
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

  async clickFollowButton(username) {
    await this.step(
      `Click on 'Follow' button for author: ${username}`,
      async () => {
        await this.followAuthorButton(username).click();
      },
    );
  }

  async clickEditArticleButton() {
    await this.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.nth(1).click();
    });
  }

  async waitForNavigationAndReload() {
    await this.page.waitForNavigation();
    await this.page.reload();
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

  async assertAllArticleTagsAreRemoved() {
    await this.step(`Assert all article tags are removed'`, async () => {
      await expect(this.articleTag.locator('li')).toHaveCount(0);
    });
  }
}
