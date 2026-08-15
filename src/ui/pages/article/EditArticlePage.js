import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.tagRemoveIcon = page.locator('.tag-list .tag-pill .ion-close-round');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async waitForOpened() {
    await this.step(`Wait for the 'Edit Article' page to open`, async () => {
      await this.page.waitForURL(/\/editor\/.+/);
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

  async clickUpdateArticleButton() {
    await this.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
      await this.page.waitForURL(/\/article\/.+/);
      await this.page.reload();
    });
  }

  async removeAllTags() {
    await this.step(`Remove all tags`, async () => {
      let count = await this.tagRemoveIcon.count();
      while (count > 0) {
        await this.tagRemoveIcon.first().click();
        await expect(this.tagRemoveIcon).toHaveCount(count - 1);
        count = await this.tagRemoveIcon.count();
      }
    });
  }

  async addTags(tags) {
    await this.step(`Fill the 'Tags' field`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    });
  }
}
