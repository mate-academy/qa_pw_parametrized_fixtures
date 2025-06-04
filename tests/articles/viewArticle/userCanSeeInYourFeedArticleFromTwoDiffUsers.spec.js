import { test } from '../../_fixtures/createArticleFixture';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

let articleDataFirstUser;
let articleDataSecondUser;

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);

  // Генерируем новые данные для каждой статьи
  const firstArticleData = generateNewArticleData();
  const secondArticleData = generateNewArticleData();

  articleDataFirstUser = await createArticle(pages[0], firstArticleData, 1);
  articleDataSecondUser = await createArticle(pages[1], secondArticleData, 2);
});

test('User can see in your feed article from two different users', async ({
  pages,
}) => {
  const homePage = new HomePage(pages[2], 3);

  await homePage.clickGlobalFeedTab();
  await pages[2].waitForTimeout(2000);

  await homePage.assertCreatedArticleTitle(articleDataFirstUser.title);
  await homePage.assertCreatedArticleTitle(articleDataSecondUser.title);
});
