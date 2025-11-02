import { expect, testStep } from '../../../common/pwHelpers/pw';

export class ViewArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleBtn = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
    this.followBtn = page.getByRole('button', { name: 'Follow' }).first();
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

  async clickEditArticle() {
    await this.editArticleBtn.click();
  }

  async assertArticleTagsAreNotVisible() {
    await this.step(`Assert the article has correct tags`, async () => {
      await expect(this.page.locator('ul.tag-list')).toBeHidden();
    });
  }

  async countTags() {
    return this.page.locator('.tag-list .tag-pill').count();
  }

  async assertArticleTagsInceasing(tagsNumber) {
    await this.step(`Assert the tags has been increased`, async () => {
      const actualCount = await this.countTags();
      expect(actualCount - 1).toBe(tagsNumber);
    });
  }

  async clickFollowBtn() {
    await this.followBtn.click({ timeout: 3000 });
  }
}
