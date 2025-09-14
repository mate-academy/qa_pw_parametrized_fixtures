import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ProfilePage } from '../../../src/ui/pages/profile/ProfilePage';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.describe(`View article by 2 other users`, () => {
  test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
    await signUpUser(pages[0], users[0], 1);
    await signUpUser(pages[1], users[1], 2);
    await signUpUser(pages[2], users[2], 3);
    await createArticle(pages[0], articleWithoutTags, 1);
    await createArticle(pages[1], articleWithoutTags, 2);
  });
  test(`View article by 2 other users`, async ({
    articleWithoutTags,
    pages,
    users,
  }) => {
    const profilePage1 = new ProfilePage(pages[2], 3, users[0].username);

    const profilePage2 = new ProfilePage(pages[2], 3, users[1].username);

    await profilePage1.open();
    await profilePage1.clickFollowBtn();

    await profilePage2.open();
    await profilePage2.clickFollowBtn();

    const homePage3 = new HomePage(pages[2], 3);
    await homePage3.open();

    await homePage3.openYourFeed();

    await homePage3.assertAuthorsVisible([
      users[0].username,
      users[1].username,
    ]);
  });
});
