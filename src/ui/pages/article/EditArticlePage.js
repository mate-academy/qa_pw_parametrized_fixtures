import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.deleteTagBtn = page.locator('span').locator('i');
    this.updateArticleBtn = page.getByRole('button', {
      name: 'Update Article',
    });
    this.enterTagsField = page.getByPlaceholder('Enter tags');
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

  async assertRemovingArticleTags() {
    await this.step(`Remove all tags from the article`, async () => {
      while ((await this.deleteTagBtn.count()) > 0) {
        await this.deleteTagBtn.first().click({ timeout: 3000 });
        //await this.page.waitForTimeout(100);
      }
      await expect(this.page.locator('.tag-list')).toBeEmpty();
    });
  }

  async addTag(tag) {
    await this.enterTagsField.fill(tag);
    await this.page.keyboard.press('Enter');
  }

  async assertTagAdded(tagQty) {
    await expect(this.deleteTagBtn).toHaveCount(tagQty + 1);
  }
}
