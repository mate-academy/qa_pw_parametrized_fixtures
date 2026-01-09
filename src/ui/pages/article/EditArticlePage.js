import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
  }

  tagRemoveIcon(tagName) {
    return this.page.locator('.tag-default').filter({ hasText: tagName }).locator('.ion-close-round');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open(slug) {
    await this.step(`Open 'Edit article' page`, async () => {
      await this.page.goto(`/editor/${slug}`);
    });
  }

  async fillTitleField(title) {
    await this.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await this.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await this.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async fillTagsField(tags) {
    await this.step(`Fill the 'Tags' field`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagField.click();
        await this.tagField.fill(tags[i]);
        await this.tagField.press('Enter');
        await this.page.waitForTimeout(2000);
      }
    });
  }

  async removeTag(tagName) {
    await this.step(`Remove tag '${tagName}'`, async () => {
      const tagElement = this.page.locator('.tag-default', { hasText: tagName });
      const removeIcon = tagElement.locator('.ion-close-round');
      await removeIcon.click();
      await this.page.waitForTimeout(2000);
    });
  }

  async removeAllTags(tags) {
    await this.step(`Remove all tags`, async () => {
      let iteration = 0;
      const maxIterations = tags.length + 5;

      while (iteration < maxIterations) {
        await this.page.waitForTimeout(500);
        const currentCount = await this.page.locator('.tag-default').count();
        
        if (currentCount === 0) {
          break;
        }

        const firstTag = this.page.locator('.tag-default').first();
        const removeIcon = firstTag.locator('i');
        await removeIcon.click({ force: true });
        
        await this.page.waitForTimeout(2000);
        
        iteration++;
      }
    });
  }

  async clickUpdateArticleButton() {
    await this.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
      await this.page.waitForURL(/\/article\/.+/);
    });
  }

  async clickPublishArticleButton() {
    await this.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
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
