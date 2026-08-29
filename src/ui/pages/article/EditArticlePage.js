import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');

    this.tagField = page.getByPlaceholder('Enter tags');
    this.tagPills = page.locator('.tag-pill');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
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

  async fillTagsField(tags) {
    await this.step(`Fill the 'Tags' field`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async removeTag(tagName) {
    await this.step(`Remove the '${tagName}' tag`, async () => {
      await this.tagPills
        .filter({ hasText: tagName })
        .locator('.ion-close-round')
        .click();
    });
  }

  async removeAllTags() {
    await this.step(`Remove all tags`, async () => {
      const removeIcons = this.page.locator('.tag-pill .ion-close-round');
      while ((await removeIcons.count()) > 0) {
        await removeIcons.first().click();
      }
    });
  }

  async clickUpdateArticleButton() {
    await this.step(`Click the 'Update Article' button`, async () => {
      const updateResponsePromise = this.page.waitForResponse(
        response =>
          response.request().method() === 'PUT' &&
          response.url().includes('/api/articles/'),
      );

      await this.updateArticleButton.click();

      await updateResponsePromise;
      await this.page.waitForURL(/\/article\//);
    });
  }
}
