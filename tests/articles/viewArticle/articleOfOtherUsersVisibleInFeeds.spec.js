import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ProfilePage } from '../../../src/ui/pages/profile/ProfilePage';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);
  await createArticle(pages[1], articleWithoutTags, 2);
  await createArticle(pages[2], articleWithoutTags, 3);

  const profilePage = new ProfilePage(pages[0]);

  await profilePage.openProfilePage(users[1].username);
  await profilePage.clickFollowButton();
  await profilePage.assertUnfollowButtonIsVisible();

  await profilePage.openProfilePage(users[2].username);
  await profilePage.clickFollowButton();
  await profilePage.assertUnfollowButtonIsVisible();
});

test(`Articles created by other users are visible in 'Your Feed' tab`, async ({
  articleWithoutTags,
  pages,
  users,
}) => {
  const homePage = new HomePage(pages[0]);

  await homePage.open();
  await homePage.clickYourFeedTab();
  await homePage.assertArticleIsVisibleInHomeFeed(
    articleWithoutTags.title,
    users[1].username,
  );
  await homePage.assertArticleIsVisibleInHomeFeed(
    articleWithoutTags.title,
    users[2].username,
  );
});
