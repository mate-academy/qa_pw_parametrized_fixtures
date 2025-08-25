import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.homeLink = page.getByRole('link', { name: 'Home' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickHomeLink() {
    await this.step(`Click the 'Home' link`, async () => {
    await this.homeLink.click();
    });
  }

  async clickHomeLink() {
    await this.step(`Click the 'Home' link`, async () => {
    await this.homeLink.click();
    });
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

  async assertArticleOnYourlFeedTabIsVisible(articleTitle, articleCreator) {
    const article = this.page.getByText(articleTitle);
    const creator = this.page.getByRole('link', { name: articleCreator }).first();

    await this.step(`Assert the '${articleTitle}' article is visible`, async () => {
      await expect.poll(async () => {
        await this.page.reload();
        return await article.isVisible();
      }, {
        timeout: 15000,
        intervals: [500, 1000, 2000],
      }).toBe(true);
      await expect(creator).toBeVisible();
      await expect(article).toBeVisible();
    });
  }
}
