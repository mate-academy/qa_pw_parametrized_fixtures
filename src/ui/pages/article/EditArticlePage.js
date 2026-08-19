import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.articleTagsField = page.getByPlaceholder(
      'Enter tags'
    ); 
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    
  }

  async editTitleField(title) {
    await test.step(`Edit the 'Title' field`, async () => {
      await this.titleField.fill('');
      await this.titleField.fill(title);
    });
  }

  async editDescriptionField(description) {
    await test.step(`Edit the 'Description' field`, async () => {
      await this.descriptionField.fill('');
      await this.descriptionField.fill(description);
    });
  }

  async editTextField(text) {
    await test.step(`Edit the 'Text' field`, async () => {
      await this.textField.clear();
      await this.textField.fill(text);
    });
  }

  async editTagsField(tag) {
    await test.step(
      `Edit the 'Tags' field with '${tag}'`, 
      async () => {
      await this.articleTagsField.clear();
      await this.articleTagsField.fill(tag);
      await this.page.keyboard.press('Enter');
    }); 
  }

  async addTags (tags) {
    await test.step(`Add tags to the article`, async () => {
      for (const tag of tags) {
        await this.articleTagsField.fill(tag);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async removeTag(tag) {
    await test.step(`Remove the tag`, async () => {
      // eslint-disable-next-line max-len
      const tagElement = this.page.locator(`.tag-list .tag-default:has-text("${tag}")`);
      const removeButton = tagElement.locator('.ion-close-round');
      await removeButton.click();
    });
  }
  
  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
      await this.page.waitForURL('**/article/**');
      await this.page.reload();
    });
  }

  async clickUpdateArticleButtonForError() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert the article has correct description'`, async () => {
      await expect(this.descriptionField).toHaveValue(description);
    });
  }

  async assertErrorMessageContainsText(messageText) {
  await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async clearTitleField() {
    await test.step(`Clear the 'Title' field`, async () => {
      await this.titleField.clear();
    });
}

  async clearDescriptionField() {
    await test.step(`Clear the 'Description' field`, async () => {
      await this.descriptionField.clear();
    });
  }

  async clearTextField() {
    await test.step(`Clear the 'Text' field`, async () => {
      await this.textField.clear();
    });
  }

  async clearTagsField() {
    await test.step(`Clear the 'Tags' field`, async () => {
      await this.articleTagsField.clear();
    });
  }

  
    async submitEditArticleForm(article) {
    await test.step(`Submit the 'Edit Article' form`, async () => {
      await this.editTitleField(article.title);
      await this.editDescriptionField(article.description);
      await this.editTextField(article.text);

     for (const tag of article.tags) {
      await this.editTagsField(tag);
}
      await this.clickUpdateArticleButton();
    });
  }
  
}