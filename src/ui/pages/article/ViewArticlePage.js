import { expect, testStep } from '../../../common/pwHelpers/pw';

export class ViewArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link')
      .filter({ hasText: 'Edit Article' })
      .first();
    this.deleteArticleButton = page
      .getByRole('link')
      .filter({ hasText: 'Delete Article' })
      .first();
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  tagListItem(tagName) {
    const locator = this.page.locator('.tag-list li');
    return tagName ? locator.filter({ hasText: tagName }) : locator;
  }

  async clickEditArticleButton() {
    await this.step(`Click on the 'Edit' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async clickDeleteArticleButton() {
    await this.step(`Click on the 'Delete' button`, async () => {
      await this.deleteArticleButton.click();
    });
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
    if (tags.length > 0) {
      await this.step(`Assert the article has correct tags`, async () => {
        for (let i = 0; i < tags.length; i++) {
          await expect(this.tagListItem(tags[i])).toBeVisible();
        }
      });
    } else {
      await this.step(`Assert the article has no tags`, async () => {
        await expect(this.tagListItem()).toHaveCount(0);
      });
    }
  }
}
