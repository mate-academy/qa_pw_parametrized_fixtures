import { expect, testStep } from '../../../common/pwHelpers/pw';

export class ViewArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  tagListItem(tagName) {
    return this.page.getByRole('listitem').filter({ hasText: tagName });
  }
  tagListItemDelete(tagName) {
    return this.page.locator('span').filter({ hasText: tagName }).locator('i');
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
  async clickEditArticleButton() {
    await this.step(`Click Edit Article Button`, async () => {
      await this.editArticleButton.click();
    });
  }
  async clickDeleteTags(tags) {
    await this.step(`Delete tags from article`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagListItemDelete(tags[i]).click();
      }
    });
  }
  async clickUpdateArticleButton() {
    await this.step(`Click Update Article`, async () => {
      await this.updateArticleButton.click();
    });
  }
  async assertArticleTagsAreNotVisible(tags) {
    await this.step(`Assert the article has correct tags`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await expect(this.tagListItem(tags[i])).toBeHidden();
      }
    });
  }
  async clickFollowUserButton(page = this.page) {
    await this.step(`Click follow user button`, async () => {
      await page.getByRole('button', { name: '   Follow' }).first().click();
    });
  }
  async clickHomeButton(page = this.page) {
    await this.step(`Click Home Page button`, async () => {
      await page.getByRole('link', { name: 'Home' }).click();
    });
  }
}
