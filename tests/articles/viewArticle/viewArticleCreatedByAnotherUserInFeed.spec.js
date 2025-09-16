import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ProfilePage } from '../../../src/ui/pages/ProfilePage';

test.use({ contextsNumber: 3, usersNumber: 3 });

let usersData;

test.beforeEach(
  async ({ pages, users, articleWithoutTags, articleWithOneTag }) => {
    await signUpUser(pages[0], users[0], 1);
    await signUpUser(pages[1], users[1], 2);
    await signUpUser(pages[2], users[2], 3);
    await createArticle(pages[0], articleWithoutTags, 1);
    await createArticle(pages[1], articleWithOneTag, 2);

    usersData = [
      {
        username: users[0].username,
        page: pages[0],
        article: articleWithoutTags,
      },
      {
        username: users[1].username,
        page: pages[1],
        article: articleWithOneTag,
      },
    ];
  },
);

test('User can see in your feeds articles from two different users', async ({
  pages,
}) => {
  const user3 = pages[2];
  const homePage = new HomePage(user3, 2);
  const profilePage = new ProfilePage(user3, 2);

  await homePage.clickYourFeedTab();
  await homePage.assertEmptyStateIsVisible();

  for (const { username } of usersData) {
    await profilePage.open(username);
    await profilePage.clickFollowButton(username);
    await profilePage.clickHomeButton();
  }

  await homePage.clickYourFeedTab();

  for (const { username, article } of usersData) {
    await homePage.assertArticleTitleContainsText(username, 0, article.title);
    await homePage.assertArticleDescriptionContainsText(
      username,
      0,
      article.description,
    );
  }
});
