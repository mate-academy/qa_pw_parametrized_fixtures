import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.titleField = page.getByPlaceholder('Article Title');
  }

  tagPill(tagName) {
    return this.page.locator('.tag-pill').filter({ hasText: tagName });
  }

  removeTagButton(tagName) {
    return this.tagPill(tagName).locator('.ion-close-round');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertTitleFieldHasValue(title) {
    await this.step(`Assert the editor is loaded with the article`, async () => {
      await expect(this.titleField).toHaveValue(title);
    });
  }

  async fillTagsField(tags) {
    await this.step(`Fill the 'Tags' field`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
        await expect(this.tagPill(tags[i])).toBeVisible();
      }
    });
  }

  async removeTags(tags) {
    await this.step(`Remove all tags from the article`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.removeTagButton(tags[i]).click();
      }
    });
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