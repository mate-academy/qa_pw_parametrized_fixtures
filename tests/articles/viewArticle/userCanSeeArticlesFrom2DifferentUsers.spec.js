import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 3, usersNumber: 3 });

test('User can see in feeds articles from two different users', async ({
  pages,
  users,
  logger,
}) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);

  const article1 = generateNewArticleData(logger, 0);
  const article2 = generateNewArticleData(logger, 0);

  await createArticle(pages[1], article1, 2);
  await createArticle(pages[2], article2, 3);

  const homePage = new HomePage(pages[0], 1);
  await homePage.clickGlobalFeedTab();

  await homePage.assertArticleTitleIsVisible(article1.title);
  await homePage.assertArticleTitleIsVisible(article2.title);
});
