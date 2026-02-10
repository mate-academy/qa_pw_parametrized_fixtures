import { expect, testStep } from '../../../common/pwHelpers/pw';

export class ViewArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByRole(
      'link', { name: 'Edit Article' }).nth(1);
    this.tags = page.locator('ul.tag-list li.tag-pill');
    
  }

  followUserLink(username) {
    return this.page.getByRole('button', 
      { name: `Follow ${username}` })
      .first()
  }

  unFollowUserLink(username) {
    return this.page.getByRole('button', 
      { name: `Unfollow ${username}` })
      .first()
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username }).first();
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

  async ClickEditArticleButton() {
    await this.step('Click edit article button', async () => {
      await this.editArticleButton.click();
    });
  }

  async assertArticleTagsAreNotVisible(tags) {
    await this.step(`Assert the article has correct tags`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await expect(this.tagListItem(tags[i])).toBeHidden();
      }
    });
  }


  async followUserLinkClick(username) {
    await this.step('Click follow user in viewed adrticle page', async () =>{
      await this.followUserLink(username).click();
    });
  }

  async unFollowUserLinkToBeVisible(username) {
    await this.step('Unfollow button to be visible', async () =>{
      await expect(this.unFollowUserLink(username)).toBeVisible();
    });
  }

  async openHome() {
    await this.step('Go to home', async () =>{
      await this.page.goto('https://conduit.mate.academy');
    })
  }
}
