import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.errorMessage = page.locator('.error-messages');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
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

  async deleteTags(tags) {
    await this.step(`Delete tags`, async () => {
      for (let tag of tags) {
        const deleteTagLocator = this
          .page.locator('span.tag-default.tag-pill')
          .filter({ hasText: tag }).locator('i.ion-close-round')
        await deleteTagLocator.click();
        await expect(deleteTagLocator).toBeHidden();
      }
    });
  }

  async fillInTags(tags) {
    await this.step(`Fill in tags`, async () => {
      for (let tag of tags) {
        await this.tagsField.fill(tag);
        await this.page.keyboard.press('Enter');
      }
    });
  }
}
