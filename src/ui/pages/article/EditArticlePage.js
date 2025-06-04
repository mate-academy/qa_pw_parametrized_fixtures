import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.removeTagLocator = page.locator('.ion-close-round').first();
    this.updateArticleButtonLocator = page.getByRole('button', {
      name: 'Update Article',
    });
    this.tagField = page.getByPlaceholder('Enter tags');
  }

  async fillTagsField(tags) {
    await this.step(`Fill the 'Tags' field`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
      }
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async updateArticleButton() {
    await this.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButtonLocator.click();
    });
  }

  async clickOnRemoveTagButton(tagNumber = 0) {
    await this.step(`Remove ${tagNumber} tags from article`, async () => {
      for (let i = 0; i < tagNumber; i++) {
        const button = this.removeTagLocator;
        await button.click();
      }
    });
  }

  async assertArticleTagHidden() {
    await this.step(`Assert the article tag is hidden`, async () => {
      await expect(this.removeTagLocator).toBeHidden();
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

  async assertArticleTagIsHere() {
    await this.step(`Assert the article tag is here`, async () => {
      await expect(this.removeTagLocator).toBeVisible();
    });
  }
}
