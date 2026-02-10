import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

    articleAtGlobalFeed(title) {
  return this.page
    .locator('.article-preview')
    .filter({ hasText: title});
  }

  articleTitleAtGlobalFeed(title) {
  return this.articleAtGlobalFeed(title).locator('h1');
  }

  articleDescriptionAtGlobalFeed(title) {
    return this.articleAtGlobalFeed(title).locator('p');
  }

  articleAuthorAtGlobalFeed(title) {
    return this.articleAtGlobalFeed(title).locator('a.author');
  }

  async assertTitleAtGlobalFeedIsVisible(title) {
    await this.step(`Assert the 'Article Title' is visible at Global Feed`, 
      async () => {
      await expect(this.articleTitleAtGlobalFeed(title)).toBeVisible();
    });
  }

  async assertDescriptionAtGlobalFeedIsVisible(title, description) {
  await this.step(`Assert the 'Article Description' is visible at Global Feed`, 
    async () => {
    await expect(this.articleDescriptionAtGlobalFeed(title))
    .toContainText(description);
  });
}

  async assertArticleAuthorAtGlobalFeedIsVisible(title, username) {
    await this.step(`Assert the 'Author' is visible at Global Feed`, 
      async () => {
      await expect(this.articleAuthorAtGlobalFeed(title))
      .toContainText(username);
    });
  }
  
}
