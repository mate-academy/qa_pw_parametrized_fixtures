import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.tagRemoveButtons = page.locator('i.ion-close-round');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.tagField = page.getByPlaceholder('Enter tags');
  }

  async fillTagsField(tags) {
    await this.step(`Fill the 'Tags' field`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    });
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

  async removeAllTags() {
    await this.step(`Remove all tags`, async () => {
      while ((await this.tagRemoveButtons.count()) > 0) {
        await this.tagRemoveButtons.first().click();
      }
    });
  }

  async updateArticleButtonClick() {
    await this.step(`Click update button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertVisibleTagsCount(expectedCount = 0) {
    await this.step(`Visible tags count is ${expectedCount}`, async () => {
      await expect(this.tagRemoveButtons).toHaveCount(expectedCount);
    });
  }
}
