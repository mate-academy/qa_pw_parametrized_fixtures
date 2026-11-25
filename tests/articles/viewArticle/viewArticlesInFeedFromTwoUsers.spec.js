import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(async ({ pages, users, articleWithoutTags, articleWithOneTag }) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);

  await createArticle(pages[0], articleWithoutTags, 1);
  await createArticle(pages[1], articleWithOneTag, 2);
});

test('User can see in feed articles from two different users', async ({
  pages,
  users,
  articleWithoutTags,
  articleWithOneTag,
}) => {
  const viewArticlePage = new ViewArticlePage(pages[2], 3);
  const homePage = new HomePage(pages[2], 3);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowButton(users[0].username);
  await viewArticlePage.assertUnfollowButtonIsVisible(users[0].username);

  await viewArticlePage.open(articleWithOneTag.url);
  await viewArticlePage.clickFollowButton(users[1].username);
  await viewArticlePage.assertUnfollowButtonIsVisible(users[1].username);

  await homePage.open();
  await homePage.clickYourFeedTab();
  await homePage.assertArticleIsVisibleInFeed(articleWithoutTags.title);
  await homePage.assertArticleIsVisibleInFeed(articleWithOneTag.title);
});