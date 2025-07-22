import { expect, testStep } from '../../../common/pwHelpers/pw';
export class CreateArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.tagItem = page.locator('.tag-list .ion-close-round');

    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Create article' page`, async () => {
      await this.page.goto('/editor');
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
        await this.tagField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async clearTagsField(tags) {
    console.log(tags);
    if (tags.length === 0) {
      await this.step('Remove all tags', async () => {
        while ((await this.tagItem.count()) > 0) {
          await this.tagItem.first().click().toHaveCount(0);
        }
      });
    } else {
      await this.step(`Remove ${tags} tag(s)`, async () => {});
      for (let i = 0; i < tags.length; i++) {
        // if ((await this.tagItem.count()) === 0) break;
        await this.tagItem.first().click();
      }
    }
  }

  async clickPublishArticleButton() {
    await this.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async clickUpdateArticleButton() {
    await this.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async submitCreateArticleForm(article) {
    await this.step(`Submit the 'Create Article' form`, async () => {
      await this.fillTitleField(article.title);
      await this.fillDescriptionField(article.description);
      await this.fillTextField(article.text);

      if (article.tags.length > 0) {
        await this.fillTagsField(article.tags);
      }
      await this.clickPublishArticleButton();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
