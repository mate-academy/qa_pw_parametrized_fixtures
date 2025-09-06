import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 3, usersNumber: 3 });

let articleUser1;
let articleUser2;

test.beforeEach(async ({ pages, users, articleWithOneTag }) => {
  articleUser1 = articleWithOneTag();
  articleUser2 = articleWithOneTag();
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);
  await createArticle(pages[0], articleUser1, 1);
  await createArticle(pages[1], articleUser2, 2);
});

test('View in your feeds articles from two different users', async ({
  pages,
}) => {
  const homePage = new HomePage(pages[2], 3);
  const viewArticlePage = new ViewArticlePage(pages[2], 3);

  await homePage.clickGlobalFeedTab();
  await homePage.clickReadMoreLinkInArticlePreview(articleUser1.title);

  await viewArticlePage.clickFollowButton();
  await viewArticlePage.clickHomeLink();

  await homePage.clickGlobalFeedTab();
  await homePage.clickReadMoreLinkInArticlePreview(articleUser2.title);

  await viewArticlePage.clickFollowButton();
  await viewArticlePage.clickHomeLink();

  await pages[2].reload();

  await homePage.assertArticleIsVisibleInYourFeed(articleUser1.title);
  await homePage.assertArticleIsVisibleInYourFeed(articleUser2.title);
});
