import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.enterTagsField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', { name : 'Update Article'});
    this.removeIcon = page.locator('.ion-close-round');
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

  async addTagsToArticle(tags) {
    await this.step(`Add tags to the article`, async() => {
      for (let i = 0; i < tags.length; i++) {
        await this.enterTagsField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async updateArticle() {
    await this.step(`Click on the 'Update Article' button`, async() => {
      await this.updateArticleButton.click();
    });
  }

  async removeTags() {
    await this.step(`Remove tag`, async() => {
      await expect(this.removeIcon.first()).toBeVisible();
      const countRemoveIcons = await this.removeIcon.count();
      console.log(`Count of remove icons: ${countRemoveIcons}`);
      for (let i = 0; i < countRemoveIcons; i++) {
        await this.removeIcon.first().click();
      }
    });
  }
}
