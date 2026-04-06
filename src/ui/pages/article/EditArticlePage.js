import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.updateArticleButton = page.getByRole('button', { name: 'Update Article' });
    this.tagField = page.getByPlaceholder('Enter tags');
  }
  getTagChip(tagName) {
    return this.page.locator('.tag-pill', { hasText: tagName });
  }
  
  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }
  async fillTagsField(tags) {
    await this.step(`Fill the 'Tags' field`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    });
  }
  async removeTagButtonClick(tags) {
    for (const tag of tags) {
      await this.getTagChip(tag).locator('i.ion-close-round').click();
    }
  }

  async clickUpdateArticleButton() {
    await this.step(`Click 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }
  async assertArticleTagsAreNotVisible(tags) {
    await this.step(`Assert the article has no tags`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await expect(this.getTagChip(tags[i])).toBeHidden();
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
