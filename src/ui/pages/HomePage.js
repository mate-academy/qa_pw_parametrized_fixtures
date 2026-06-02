import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.GlobalFeedTab = page.getByText('Global Feed');
  }


  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async open() {
    await this.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }
  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }
  async clickGlobalFeedTab() {
    await this.step(`Click the 'Global Feed' tab`, async () => {
      await this.GlobalFeedTab.click();
    }); 
}



 async assertArticleAuthorNameIsVisible(authorName) {
    await this.step(`Assert the article has correct author name`, async () => {
      await expect(this.page.getByText(authorName)).toBeVisible();
    });
  }

 

}