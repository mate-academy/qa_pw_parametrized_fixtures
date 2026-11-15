import { expect, testStep } from '../../../common/pwHelpers/pw';

export class ViewArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
    this.logoLink = page.getByRole('navigation').getByRole('link', {
      name: 'conduit',
    });
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username, exact: true });
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

  async assertArticleTagsAreNotVisible(tags) {
    await this.step(`Assert all tags are not visible`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await expect(this.tagListItem(tags[i])).toBeHidden();
      }
    });
  }
  async clickEditArticleButton() {
    await this.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }
  async clickLogoLink() {
    await this.step(`Click on the 'Logo' link`, async () => {
      await this.logoLink.click();
    });
  }

  findFollowButton(username) {
    return this.page
      .getByRole('button', { name: `Follow ${username}` })
      .first();
  }
  findUnfollowButton(username) {
    return this.page
      .getByRole('button', { name: `Unfollow ${username}` })
      .first();
  }

  async clickFollowAuthorButton(username) {
    await this.step(`Click on the 'Follow' button`, async () => {
      await this.findFollowButton(username).click();
    });
  }
  async assertAuthorIsFollowed(username) {
    await this.step(`Assert the follow on the Author`, async () => {
      await expect(this.findUnfollowButton(username)).toBeVisible();
    });
  }
}
