import { expect, testStep } from '../../../common/pwHelpers/pw';

export class ViewArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleLink = page.getByRole(
      'link', {name: 'Edit Article'}).first();
    this.tagsList = page.locator('.tag-list');
    this.followUserButton = page.getByRole('button', {name: /Follow/}).first();
    this.homeLink = page.getByRole('link', {name: 'Home'});
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  tagListItem(tagName) {
    return this.page.getByRole('listitem').filter({ hasText: tagName });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await this.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async wait() {
    await this.step(`Waiting for article page`, async() => {
      this.page.waitForURL(/article/);
    });
  }

  async clickEditArticleLink() {
    await this.step(`Click edit Article Link`, async () => {
      await this.editArticleLink.click();
    });
  }

  async clickFollowUserButton(){
    await this.step(`Click Follow button`, async() => {
      await this.followUserButton.click();
    });
  }

  async clickHomeLink() {
    await this.step(`Click Home Link`, async () => {
      await this.homeLink.click();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await this.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await this.step(
      `Assert the article has correct author username`,
      async () => {
        await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
      },
    );
  }

  async assertArticleTextIsVisible(text) {
    await this.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleTagsAreVisible(tags) {
    await this.step(`Assert the article has correct tags`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await expect(this.tagListItem(tags[i])).toBeVisible();
      }
    });
  }

  async assertTagsListHasNoTags() {
    this.step(`Article hasn't tags`, async() => {
      await expect (this.tagsList).toBeHidden();
    });
  }
}
