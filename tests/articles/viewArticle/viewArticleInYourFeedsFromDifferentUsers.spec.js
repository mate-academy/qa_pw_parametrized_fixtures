import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

let articleOneData;
let articleTwoData;

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(async ({ pages, users, logger }) => {
  articleOneData = generateNewArticleData(logger);
  articleTwoData = generateNewArticleData(logger);

  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await createArticle(pages[0], articleOneData, 1);
  await createArticle(pages[1], articleTwoData, 2);
});

test('View an articles in your feeds created by two different users', async ({
  articleWithoutTags,
  pages,
  users,
}) => {
  await signUpUser(pages[2], users[2], 3);

  const homePage = new HomePage(pages[2], 3);
  
  await homePage.open();
  await homePage.assertGlobalFeedTabIsVisible();
  await homePage.clickGlobalFeedTabButton();
  await homePage.assertArticleOnGlobalFeedTabIsVisible(articleOneData.title, users[0].username);
  await homePage.assertArticleOnGlobalFeedTabIsVisible(articleTwoData.title, users[1].username);
});