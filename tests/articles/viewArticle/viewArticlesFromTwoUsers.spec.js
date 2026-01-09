import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(
  async ({ pages, users, articleWithoutTags, articleWithOneTag, logger }) => {
    await signUpUser(pages[0], users[0], 1);
    await signUpUser(pages[1], users[1], 2);
    await signUpUser(pages[2], users[2], 3);

    await createArticle(pages[0], articleWithoutTags, 1);
    await createArticle(pages[1], articleWithOneTag, 2);
  },
);

test('User can see in your feeds articles from two different users', async ({
  pages,
  users,
  articleWithoutTags,
  articleWithOneTag,
}) => {
  const homePage = new HomePage(pages[2], 3);

  await homePage.open();
  
  await pages[2].waitForLoadState('networkidle');
  
  await homePage.clickGlobalFeedTab();
  await pages[2].waitForTimeout(1000);

  await homePage.assertArticleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleAuthorIsVisible(
    articleWithoutTags.title,
    users[0].username,
  );

  await homePage.assertArticleIsVisible(articleWithOneTag.title);
  await homePage.assertArticleAuthorIsVisible(
    articleWithOneTag.title,
    users[1].username,
  );
});
