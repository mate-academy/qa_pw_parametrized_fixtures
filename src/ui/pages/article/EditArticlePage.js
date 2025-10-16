import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByRole('link', { name: ' Edit Article' }).nth(1)
    this.updateArticleButton = page.getByRole('button', {name: 'Update Article'});
  }

  tagListItemOnEditPage(tagName) {
    return this.page.locator('.tag-list .tag-pill').filter({ hasText: tagName });
  }

  async clickEditArticleButton() {
    await this.step('Click edit article button', async () => {
      await this.editArticleButton.click();
    })
  }

  async clickUpdateArticleButton() {
    await this.step('Click update article button', async () => {
      await this.updateArticleButton.click();
    })
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

  async assertArticleTagsAreDeleted(tags) {
    await this.step(`Assert the article has correct tags`, async () => {
      for (let i = 0; i < tags.length; i++) {
        const tagItem = this.tagListItemOnEditPage(tags[i]);
        const deleteIcon = tagItem.locator('.ion-close-round');

        await deleteIcon.click();
        await expect(tagItem).toBeHidden();
      }
    });
  }

  async assertArticleTagsAreVisible(tags) {
    await this.step(`Assert the article has correct tags`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await expect(this.tagListItemOnEditPage(tags[i])).toBeVisible();
      }
    });
  }
}
