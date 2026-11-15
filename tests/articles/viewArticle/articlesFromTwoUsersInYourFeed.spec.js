import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { followArticleAuthor } from '../../../src/ui/actions/articles/followArticleAuthor';

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

test('View an article created by another user', async ({
  articleWithoutTags,
  articleWithOneTag,
  pages,
  users,
}) => {
  const viewArticlePage = new ViewArticlePage(pages[2], 3);
  const homePage = new HomePage(pages[2], 3);

  await followArticleAuthor(
    pages[2],
    articleWithoutTags.title,
    users[0].username,
  );

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(users[0].username);
  await viewArticlePage.clickLogoLink();
  await expect(pages[2]).toHaveURL('/');
  await followArticleAuthor(
    pages[2],
    articleWithOneTag.title,
    users[1].username,
  );
  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(users[1].username);
  await viewArticlePage.clickLogoLink();
  await expect(pages[2]).toHaveURL('/');
  await pages[2].reload();
  await homePage.assertYourFeedTabIsActive();
  await homePage.assertArticleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleIsVisible(articleWithOneTag.title);
});
