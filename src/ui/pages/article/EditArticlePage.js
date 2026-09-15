import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleTagLocator = page.locator('form i');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.articleTagsField = page.getByPlaceholder('Enter tags');
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

  async removeArticleTag() {
    await this.step(
      `Remove article Tag for existing articlWithTag`,
      async () => {
        await this.articleTagLocator.first().click();
      },
    );
  }

  async addArticleTagsField(tag) {
    await this.step(`Add tag for existing article without tags`, async () => {
      await this.articleTagsField.fill(tag);
      await this.articleTagsField.press('Enter');
    });
  }

  async clickUpdateArticleButton() {
    await this.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }
}
