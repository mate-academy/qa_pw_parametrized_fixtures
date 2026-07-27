import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);

  await createArticle(pages[0], articleWithoutTags, 1);
  await createArticle(pages[1], articleWithoutTags, 2);
});

test('User can see in your feeds articles from two different users', async ({
  pages,
  users,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(pages[2], 3);

  await homePage.open();
  await homePage.assertArticleByAuthorIsVisible(users[0].username);
  await homePage.assertArticleByAuthorIsVisible(users[1].username);
});