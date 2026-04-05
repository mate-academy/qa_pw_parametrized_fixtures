import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.removeTag = page.locator('form i');
    this.updateArticle = page.getByRole('button', { name: 'Update Article' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickUpdateArticleButton() {
    await this.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticle.click();
    });
  }

  async removeTags() {
    await this.step('Remove tags for the article with tag', async () => {
      await this.removeTag.first().waitFor({ state: 'visible' });

      while ((await this.removeTag.count()) > 0) {
        await this.removeTag.first().click();
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
