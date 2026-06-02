import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', { name: 'Update Article' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertArticleTitle(title) {
    await this.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async fillTagField(tags) {
    await this.step(`Fill 'Tag' field with ${tags} tags`, async () => {
      for (const tag of tags) {
        await this.tagField.fill(tag);
        await this.tagField.press('Enter');
      }
    });
  }

  async clickUpdateArticleButton() {
    await this.step(`Click 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
   }

  async assertArticleText(text) {
    await this.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async clickOnDeleteTag(tagName) {
    await this.step(`Click on delete button for tag ${tagName}`, async () => {
    const tagSpan = this.page.locator('span', { hasText: tagName });
     await tagSpan.locator('i').click();
});

}
  
}
