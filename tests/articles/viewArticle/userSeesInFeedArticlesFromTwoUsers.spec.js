import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(async ({ pages, users }) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);
});

test('User can see in your feeds articles from two different users', async ({
  pages,
  logger,
}) => {
  const article1 = generateNewArticleData(logger);
  const article2 = generateNewArticleData(logger);

  await createArticle(pages[0], article1, 1);
  await createArticle(pages[1], article2, 2);

  const homePage = new HomePage(pages[2], 3);
  await pages[2].goto('/');
  await homePage.clickGlobalFeedTab();

  await expect(pages[2].getByText(article1.title)).toBeVisible();
  await expect(pages[2].getByText(article2.title)).toBeVisible();
});
