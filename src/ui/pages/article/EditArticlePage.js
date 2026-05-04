import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillTagsField(tags) {
    if (!tags || tags.length === 0) return;
    await this.step(`Fill the 'Tags' field`, async () => {
      for (const tag of tags) {
        await this.tagsField.fill(tag);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async clickUpdateArticleButton() {
    await this.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async clickRemoveTag(tag) {
    await this.step(`Click remove '${tag}' tag from article`, async () => {
      const tags = this.page.locator('.tag-list span');
      await tags
        .filter({ hasText: new RegExp(`^${tag}$`) })
        .locator('i.ion-close-round')
        .click();
    });
  }

  async removeTags(tags) {
    if (!tags || tags.length === 0) return;
    for (const tag of tags) {
      await this.clickRemoveTag(tag);
    }
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
