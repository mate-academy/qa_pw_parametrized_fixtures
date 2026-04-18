import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleTags = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  tagListItem(tagName) {
    return this.page.locator('.tag-list span').filter({ hasText: tagName });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickUpdateArticleButton() {
    await this.step(`Click update article button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertArticleTitle(title) {
    await this.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await this.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async removeArticleTags(tags) {
    await this.step(`Remove article tags`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagListItem(tags[i]).locator('.ion-close-round').click();
      }
    });
  }

  async updateArticleTags(tags) {
    await this.step(`Add tags to article`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.articleTags.fill(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    });
  }
}
