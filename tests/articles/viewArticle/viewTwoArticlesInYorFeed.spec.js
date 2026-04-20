import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { faker } from '@faker-js/faker';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.use({ contextsNumber: 3, usersNumber: 3 });

let article1, article2;

test.beforeEach(async ({ pages, users, logger }) => {
  article1 = generateNewArticleData(logger);
  article2 = generateNewArticleData(logger);

  await signUpUser(pages[0], users[0]);
  await signUpUser(pages[1], users[1]);
  await signUpUser(pages[2], users[2]);

  await createArticle(pages[0], article1, 1);
  await createArticle(pages[1], article2, 2);
});

test(`View 2 articles from different users in Your Feed`, async ({
  pages
}) => {
  const viewArticlePage = new ViewArticlePage(pages[2]);
  const homePage = new HomePage(pages[2]);

  await viewArticlePage.open(article1['url']);
  await viewArticlePage.clickFollowUserButton();
  await viewArticlePage.open(article2['url']);
  await viewArticlePage.clickFollowUserButton();
  await viewArticlePage.clickHomeLink();
  await homePage.assertArticleTitleIsVisible(article1.title);
  await homePage.assertArticleTitleIsVisible(article2.title);
});
