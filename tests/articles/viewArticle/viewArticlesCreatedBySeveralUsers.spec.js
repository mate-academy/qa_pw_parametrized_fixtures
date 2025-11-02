import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(async ({ pages, users, articleWithoutTags, articleWithOneTag }) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);
  await createArticle(pages[0], articleWithoutTags, 1);
  await createArticle(pages[1], articleWithOneTag, 2);
});

test(`View an articles in 'Your Feed' created by several users`, async ({
  articleWithoutTags,
  articleWithOneTag,
  pages,
  users,
}) => {
  const viewArticlePage = new ViewArticlePage(pages[2], 3);
  const homePage = new HomePage(pages[2], 3);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowButton();
  await viewArticlePage.open(articleWithOneTag.url);
  await viewArticlePage.clickFollowButton();

  await homePage.open();

  await homePage.assertArticleAuthorContainsAuthor(users[0].username);
  await homePage.assertArticleTitleContainsTitle(articleWithoutTags.title);

  await homePage.assertArticleAuthorContainsAuthor(users[1].username);
  await homePage.assertArticleTitleContainsTitle(articleWithOneTag.title);
});