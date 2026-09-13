import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.enterTagsField = page.getByPlaceholder('Enter tags');
    this.tagPillsInForm = page.locator('.tag-list span.tag-pill');
  }

  deleteTagButton(tagName) {
    return this.page
      .locator('span.tag-default.tag-pill')
      .filter({ hasText: tagName })
      .locator('.ion-close-round');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickUpdateArticleButton() {
    await this.step(`Click "Update Article" button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async clickDeleteTagButton(tags) {
    await this.step(`Click "X" button to delete tag`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.deleteTagButton(tags[i]).click();
      }
    });
  }
  async enterTagsIntoField(tags) {
    await this.step(`Enter tags`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.enterTagsField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
        await expect(
          this.tagPillsInForm.filter({ hasText: tags[i] }),
        ).toBeVisible();
      }
    });
  }

  async assertArticleTitle(title) {
    await this.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }
  async assertArticleHasCorrectTitle(title) {
    await this.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitle).toHaveValue(title);
    });
  }

  async assertArticleText(text) {
    await this.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
