import { test, expect } from '@playwright/test';

export class ViewArticlePage {
    constructor(page) {
        this.page = page;
        this.articleTitleHeader = page.getByRole('heading');
        this.tags = page.locator('.tag-list').getByRole('listitem')
        this.editButton = page.getByRole('link', { name: 'Edit Article', exact: false }).first();
    }

    authorLinkInArticleHeader(username) {
        return this.page.getByRole('link', { name: username, exact: false }).first();
    }

    url() {
        return this.page.url();
    }

    async clickEditArticle() {
        await this.editButton.click();
    }

    async open(url) {
        await test.step(`Open 'View Article' page`, async () => {
            await this.page.goto(url);
        });
    }

    async assertArticleTitleIsVisible(title) {
        await test.step(`Assert the article has correct title`, async () => {
            await expect(this.articleTitleHeader).toContainText(title);
        });
    }

    async assertArticleTextIsVisible(text) {
        await test.step(`Assert the article has correct text`, async () => {
            await expect(this.page.getByText(text)).toBeVisible();
        });
    }

    async assertArticleTagsAreNotVisible(tags) {
        await test.step(`Assert the article has no specified tags`, async () => {
            for (let i = 0; i < tags.length; i++) {
                await expect(this.tags.filter({ hasText: new RegExp(`^${tags[i]}`) }) ).not.toBeVisible()
            }
        });
    }

    async assertArticleTagsAreVisible(tags) {
        await test.step(`Assert the article has correct tags`, async () => {
            for (let i = 0; i < tags.length; i++) {
                await expect(this.tags.filter({ hasText: new RegExp(`^${tags[i]}`) }) ).toBeVisible();
            }
        });
    }

    async assertArticleAuthorNameIsVisible(username) {
        await test.step(`Assert the article has correct author username`, async () => {
            await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
        });
    }
}
