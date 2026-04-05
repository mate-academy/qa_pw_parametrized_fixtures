import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.use({ contextsNumber: 3, usersNumber: 3 });
let homePage;

test.beforeEach(
  async ({ pages, users, articleWithoutTags, articleWithOneTag }) => {
    await signUpUser(pages[0], users[0], 1);
    await signUpUser(pages[1], users[1], 2);
    await signUpUser(pages[2], users[2], 3);
    await createArticle(pages[0], articleWithoutTags, 1);
    await createArticle(pages[1], articleWithOneTag, 2);
  },
);

test('View an article created by another user', async ({
  articleWithoutTags,
  articleWithOneTag,
  pages,
  users,
}) => {
  homePage = new HomePage(pages[2], 3);
  await homePage.goToGlobalFeed();
  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await homePage.assertArticleAuthorNameIsVisible(users[0].username);
  await homePage.assertArticleAuthorNameIsVisible(users[1].username);
});
