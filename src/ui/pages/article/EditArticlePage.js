import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.titleField = page.getByPlaceholder('Article Title');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertArticleTitle(title) {
    await this.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await this.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async waitForArticleToLoad(title) {
    await this.step(`Wait for the article to load in the editor`, async () => {
      await expect(this.titleField).toHaveValue(title);
    });
  }

  async removeAllTags(tags) {
    await this.step(`Remove all tags from the article`, async () => {
      for (const tag of tags) {
        // Find the tag pill and click the X icon inside it
        await this.page
          .locator('.tag-default.tag-pill') // the tag pill class
          .filter({ hasText: tag })
          .locator('button, i, .ion-close-round')
          .click();
      }
    });
  }

  async updateArticle() {
    return await this.step(`Save changes to the article`, async () => {
      const updateResponse = this.page.waitForResponse(
        response =>
          response.request().method() === 'PUT' &&
          response.url().includes('/api/articles/'),
      );
      await this.page.getByRole('button', { name: 'Update Article' }).click();
      const response = await updateResponse;
      expect(response.status()).toBe(200);
      await this.page.waitForURL('**/article/**', { waitUntil: 'networkidle' });
      await this.page.reload({ waitUntil: 'networkidle' });
    });
  }

  async addTags(tags) {
    await this.step(`Add tags to the article`, async () => {
      const tagField = this.page.getByPlaceholder('Enter tags');

      for (const [index, tag] of tags.entries()) {
        await tagField.fill(tag);
        await tagField.press('Enter');
        await expect(tagField).toBeEmpty();
        await expect(this.page.locator('.tag-default.tag-pill')).toHaveCount(
          index + 1,
        );
      }
    });
  }
}
