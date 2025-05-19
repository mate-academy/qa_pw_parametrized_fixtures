import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticle = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
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

  async clearTags() {
    await this.step(`Clear all tags`, async () => {
      const removeButtons = this.page.locator('.ion-close-round');
      const count = await removeButtons.count();
      for (let i = 0; i < count; i++) {
        await removeButtons.nth(0).click();
      }
    });
  }

  async fillTagsField(tags) {
    await this.step(`Fill the 'Tags' field`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async clickUpdateArticleButton() {
    await this.step(`Click update button`, async () => {
      await this.updateArticleButton.click();
    });
  }
}
