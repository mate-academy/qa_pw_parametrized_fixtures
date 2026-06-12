import { test } from '@playwright/test';

export class EditArticlePage {
    constructor(page) {
        this.page = page;
        this.titleField = page.getByPlaceholder('Article Title');
        this.descriptionField = page.getByPlaceholder(`What's this article about?`);
        this.textBody = page.getByPlaceholder('Write your article (in markdown)');
        this.tagsField = page.getByPlaceholder('Tags');
        this.tags = page.locator('.tag-list span');
        this.updateArticleButton = page.getByRole('button', { name: 'Update' });
    }

    async clickUpdateArticleButton() {
        await test.step(`Update Article Button`, async () => {
            await this.updateArticleButton.click()
        })
    }

    async waitForArticleTitle() {
        await test.step(`Wait for Article Title`, async () => {
            await this.titleField.waitFor({state: 'visible'});
        })
    }

    async fillTitleField(title) {
        await test.step(`Fill the 'Title' field`, async () => {
            await this.titleField.fill(title);
        });
    }

    async fillDescriptionField(description) {
        await test.step(`Fill the 'Description' field`, async () => {
            await this.descriptionField.fill(description);
        });
    }

    async fillTextField(text) {
        await test.step(`Fill the 'Text' field`, async () => {
            await this.textBody.fill(text);
        });
    }

    async clickRemoveTag(tag) {
        await test.step(`Click remove '${tag}' tag from article`, async () => {
            await this.tags
                .filter({ hasText: new RegExp(`^${tag}$`) })
                .locator('i.ion-close-round')
                .click();
        });
    }

    async removeTags(tags) {
        if (!tags || tags.length === 0) return;
        for (const tag of tags) {
            await this.clickRemoveTag(tag);
        }
    }

    async fillTagsField(tags) {
        if (!Array.isArray(tags) || tags.length === 0) {
            return;
        }

        for (const tag of tags) {
            await this.tagsField.fill(tag);
            await this.page.keyboard.press('Enter');
        }
    }
}