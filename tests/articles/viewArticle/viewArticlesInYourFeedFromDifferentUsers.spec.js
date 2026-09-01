import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ProfilePage } from '../../../src/ui/pages/ProfilePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);
  await createArticle(pages[0], articleWithoutTags, 1);
  await createArticle(pages[1], articleWithoutTags, 2);
});

test('View articles in your feeds created by another users', async ({
  pages,
  users,
}) => {
  const homePage = new HomePage(pages[2], 3);
  const profilePage = new ProfilePage(pages[2], 3);

  for (const user of users.slice(0, 2)) {
    await profilePage.open(user.username);
    await profilePage.followUser(user.username);
  }

  await homePage.open();
  await homePage.assertOtherUsersArticlesAreVisible(
    users.slice(0, 2).map(user => user.username),
  );
});
