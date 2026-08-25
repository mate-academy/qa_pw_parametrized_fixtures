import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.articleTitleHeader = page.getByRole('heading');

    this.tagsField = page.getByPlaceholder('Enter tags');

    this.removeTag = page.locator('form i');

    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async removeTags() {
    await this.step(`Remove tags from the article`, async () => {
      await this.removeTag.first().waitFor({ state: 'visible' });

      while ((await this.removeTag.count()) > 0) {
        await this.removeTag.first().click();
      }
    });
  }

  async updateTagsField(tagsArray) {
    if (!Array.isArray(tagsArray) || !tagsArray.length) {
      return;
    }

    for (const tag of tagsArray) {
      await this.step(`Update field with tag: "${tag}"`, async () => {
        await this.tagsField.fill(tag);
        await this.page.keyboard.press('Enter');
      });
    }
  }

  async clickUpdateArticleButton() {
    await this.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
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
}
