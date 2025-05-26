import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleTag = page.locator('.tag-list');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async removeAllArticleTags(tags) {
    await this.step(`Remove the all tags from the tag list`, async () => {
      for (const tag of tags) {
        const tagElement = await this.articleTag.getByText(tag);
        const removeButton = await tagElement.locator('.ion-close-round');
        await removeButton.click();
        await expect(this.articleTag).not.toContainText(tag);
      }
    });
  }

  async editTagsField(tags) {
    await this.step(`Edit the 'Tags' field`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async clickUpdateArticleButton() {
    await this.step(`Click the 'Update Article' button`, async () => {
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
}
