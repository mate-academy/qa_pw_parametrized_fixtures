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
  const homePage = new HomePage(pages[2], 3);
  const viewArticlePage = new ViewArticlePage(pages[2], 3);

  await homePage.open();
  await homePage.assertYourFeedTabIsVisible();
  await homePage.clickGlobalFeedTab();
  await homePage.assertArticleTitleInFeedIsVisible(articleWithoutTags.title);
  await homePage.assertArticleTitleInFeedIsVisible(articleWithOneTag.title);

  await homePage.clickArticleTitleInFeed(articleWithoutTags.title);
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertFollowButtonContainsAuthorName(users[0].username);
  await viewArticlePage.clickFollowAuthorButton();

  await homePage.open();
  await homePage.clickGlobalFeedTab();
  await homePage.clickArticleTitleInFeed(articleWithOneTag.title);
  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertFollowButtonContainsAuthorName(users[1].username);
  await viewArticlePage.clickFollowAuthorButton();
});

test('User can see in your feeds articles from two different user', async ({
  articleWithoutTags,
  articleWithOneTag,
  pages,
}) => {
  const homePage = new HomePage(pages[2], 3);

  await homePage.open();
  await homePage.assertYourFeedTabIsVisible();
  await homePage.assertArticleTitleInFeedIsVisible(articleWithoutTags.title);
  await homePage.assertArticleTitleInFeedIsVisible(articleWithOneTag.title);
});
