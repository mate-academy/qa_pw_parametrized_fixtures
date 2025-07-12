import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleTagField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole(
      'button', { name: 'Update Article'}
    );
  }

  async deleteTags(tags) {
    await this.step(`Remove tags <${tags}>`, async () =>{
      for (const tag of tags) {
        const crossButtonTag = this.page.locator(
          'span').filter({ hasText: tag }).locator('i'
        );
        await crossButtonTag.click()
      }
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickUpdateButton() {
    await this.step('Click update button', async () => {
      await this.updateArticleButton.click()
    });
  }

  async addTags(tags) {
    await this.step(`Add tags <${tags}> to article`, async () => {
      for (const tag of tags) {
        await this.articleTagField.fill(tag);
        await this.page.keyboard.press('Enter');
      }

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
