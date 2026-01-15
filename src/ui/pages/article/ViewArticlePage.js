import { expect, testStep } from '../../../common/pwHelpers/pw';

export class ViewArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
    this.anotherTagElement = page.locator('.tag-default.tag-pill.tag-outline');
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

  async assertArticleTagsAreVisible() {
    await this.step(`Assert the article has correct tags`, async () => {
      const tagsCount = await this.anotherTagElement.count();
      await expect(this.anotherTagElement).toHaveCount(tagsCount);
    });
  }

  async assertArticleTagsAreHidden() {
    await this.step(`Assert the article are hidden`, async () => {
      await expect(this.anotherTagElement).toBeHidden();
    });
  }

  async clickOnEditArticleButton() {
    await this.step(`Click on 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }
}
