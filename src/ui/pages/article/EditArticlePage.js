import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.updateArticleButton = page.getByRole(
      'button', {name: "Update Article"});
    this.tagsInputField = page.getByPlaceholder('Enter tags');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  tagItem(tagName) {
    return this.page.getByText(tagName);
  }

  async clickUpdateArticleButton() {
    await this.step(`Click 'Update Article' button`, async() => {
      await this.updateArticleButton.click();
    });
  }

  async fillTagsInputField(tag) {
    await this.step(`Fill tags input field with new tag`, async() => {
      await this.tagsInputField.fill(tag);
    })
  }

  async removeArticleTags(tags) {
    await this.step(`Remove tags from article`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagItem(tags[i]).locator('.ion-close-round').click();
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
