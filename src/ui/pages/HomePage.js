import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.yourGlobalTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.createdArticleTitle = page.locator('h1');
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

  async clickGlobalFeedTab() {
    await this.step(`Click the 'Global Feed' tab`, async () => {
      await this.yourGlobalTab.click();
    });
  }

  async assertCreatedArticleTitle(expectedTitle) {
    await this.step(
      `Assert article with title "${expectedTitle}" is visible`,
      async () => {
        // Используем локатор с фильтрацией по тексту
        const titleLocator = this.createdArticleTitle.filter({
          hasText: expectedTitle,
        });

        // Проверяем что заголовок существует и видим
        await expect(titleLocator).toBeVisible({
          timeout: 1000,
          message: `Article with title "${expectedTitle}" not found or not visible`,
        });
      },
    );
  }
}
