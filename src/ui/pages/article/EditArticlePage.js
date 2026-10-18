import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.tagField = page.getByPlaceholder('Enter tags');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async editArticleButtonClick() {
    await this.step('Click edit article', async () => {
      await this.editArticleButton.click();
    });
  }
  async updateArticleButtonClick() {
    await this.step('Click update article', async () => {
      await this.updateArticleButton.click();
      await this.page.waitForURL(/\/article\//);
    });
  }

  async deleteTagButton(tags) {
    await this.step('Delete all tags', async () => {
      for (let tag of tags) {
        await this.page
          .locator('span')
          .filter({ hasText: tag })
          .locator('i')
          .click();
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
