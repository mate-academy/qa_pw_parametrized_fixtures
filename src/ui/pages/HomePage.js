import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async open() {
    await this.step(`Open 'Home' page`, async () => {
    await this.page.goto('/');
  });
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

  async clickYourFeedTab() {
    await this.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    }); 
  }

  async assertArticleInYourFeedIsVisible(title){
    // eslint-disable-next-line max-len
    await this.step(`Assert the article with title '${title}' is visible in 'Your Feed'`, async () => {
      const articleInYourFeed = this.page.getByRole('link', { name: title });
      await expect(articleInYourFeed).toBeVisible();
    }); 
  }



}
