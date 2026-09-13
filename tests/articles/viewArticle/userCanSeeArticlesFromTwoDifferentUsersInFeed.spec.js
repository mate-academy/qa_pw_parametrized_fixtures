import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { expect } from '@playwright/test';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(
  async ({ pages, users, articleWithoutTags, articleWithOneTag }) => {
    await signUpUser(pages[0], users[0], 1);
    await signUpUser(pages[1], users[1], 2);
    await signUpUser(pages[2], users[2], 3);

    await createArticle(pages[0], articleWithoutTags, 1);
    await createArticle(pages[1], articleWithOneTag, 2);
  },
);

test('User can see in your feeds articles from two different users', async ({
  pages,
  users,
  articleWithoutTags,
  articleWithOneTag,
}) => {
  const viewArticlePage = new ViewArticlePage(pages[2], 3);
  const homePage = new HomePage(pages[2], 3);
  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(
    users[0].username.toLowerCase(),
  );
  await viewArticlePage.clickFollowUserButton();
  await expect(viewArticlePage.unfollowUserButton).toBeVisible();

  await viewArticlePage.open(articleWithOneTag.url);
  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(
    users[1].username.toLowerCase(),
  );
  await viewArticlePage.clickFollowUserButton();
  await expect(viewArticlePage.unfollowUserButton).toBeVisible();

  await homePage.clickHomeButton();
  await pages[2].reload();
  await homePage.assertYourFeedTabIsVisible();
  await homePage.assertArticleAuthorLinkInFeedIsVisible(
    users[0].username.toLowerCase(),
    articleWithoutTags.title,
  );
  await homePage.assertArticleAuthorLinkInFeedIsVisible(
    users[1].username.toLowerCase(),
    articleWithOneTag.title,
  );
  await homePage.assertArticleTitleHeadingInFeedIsVisible(
    articleWithoutTags.title,
  );
  await homePage.assertArticleTitleHeadingInFeedIsVisible(
    articleWithOneTag.title,
  );
});
