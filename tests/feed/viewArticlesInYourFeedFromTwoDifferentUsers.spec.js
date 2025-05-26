import { test } from '../_fixtures/fixtures';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../src/ui/pages/HomePage';

test.use({ contextsNumber: 3, usersNumber: 3, articlesNumber: 2 });

let article1;
let article2;

test.beforeEach(async ({ pages, users, articlesWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);

  article1 = await createArticle(pages[0], articlesWithoutTags[0], 1);
  article2 = await createArticle(pages[1], articlesWithoutTags[1], 2);
});

test(`User sees in 'Your Feed' tab articles from two different users`, async ({
  users,
  pages,
}) => {
  const viewArticlePage = new ViewArticlePage(pages[2], 3);
  const homePage = new HomePage(pages[2], 3);

  // Open and interact with first article
  await viewArticlePage.open(article1.url);
  await viewArticlePage.assertArticleTitleIsVisible(article1.title);
  await viewArticlePage.clickFollowButton(users[0].username);

  // Open and interact with second article
  await viewArticlePage.open(article2.url);
  await viewArticlePage.assertArticleTitleIsVisible(article2.title);
  await viewArticlePage.clickFollowButton(users[1].username);

  // Navigate to home feed and verify articles
  await homePage.open();
  await homePage.clickYourFeedTab();
  await homePage.assertUsersAreVisible([users[0].username, users[1].username]);
});
