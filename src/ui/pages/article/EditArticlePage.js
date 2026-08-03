import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.tagField = page.getByPlaceholder('Enter tags');
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

  async fillTagsField(tags) {
    return await this.step(`Fill the 'Tags' field with: ${tags}`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async clearTagsField() {
    return await this.step('Clear all tags', async () => {
      const removeTagButtons = this.page.locator(
        '.tag-pill i.ion-close-round, .tag-list .ion-close-round',
      );
      await removeTagButtons.first().waitFor({ state: 'visible' });
      const count = await removeTagButtons.count();
      for (let i = 0; i < count; i++) {
        await removeTagButtons.first().click();
      }
    });
  }

  async clickUpdateArticleButton() {
    return await this.step("Click the 'Update Article' button", async () => {
      await this.updateArticleButton.click();
      await this.page.waitForURL(/\/article\//);
    });
  }
}
