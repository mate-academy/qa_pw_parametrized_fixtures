import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.tagsInputField = page.getByPlaceholder('Enter tags');
    this.tagsDeleteButton = page.locator('form i');
    this.updateArticleButton = page.getByRole('button', { 
      name: 'Update Article' });
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

  async fillTagsField(tags) {
    await this.step(`Fill the 'Tags' field`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagsInputField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async deleteAllTags() {
    await this.step(`Delete all tags`, async () => {
      await expect(this.tagsDeleteButton.first()).toBeVisible();
      const tagsCount = await this.tagsDeleteButton.count();
      for (let i = 0; i < tagsCount; i++) {
        await this.tagsDeleteButton.first().click();
      }
    });
  }

  async clickUpdateArticleButton() {
    await this.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }
}
