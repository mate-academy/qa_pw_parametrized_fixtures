import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';

import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);

  await createArticle(pages[0], articleWithoutTags, 1);
   await createArticle(pages[1], articleWithoutTags, 2);
});

test('View an article created by another 2 users in global feed', async ({
  articleWithoutTags,
  pages,
  users
}) => {
  const homePage = new HomePage(pages[2], 3);
  await homePage.open();
  await homePage.page.waitForTimeout(1000);
  await homePage.page.reload();
  await homePage.clickGlobalFeedTab();
  await homePage.page.waitForTimeout(3000);

 await homePage.assertArticleAuthorNameIsVisible(users[0].username);
await homePage.assertArticleAuthorNameIsVisible(users[1].username);
});
