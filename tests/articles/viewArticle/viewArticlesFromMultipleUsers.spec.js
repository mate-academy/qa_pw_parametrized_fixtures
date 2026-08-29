import { test } from '../../_fixtures/fixtures';

import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(
  async ({ pages, users, articleWithoutTags, articleWithOneTag }) => {
    await signUpUser(pages[0], users[0], 1);
    await signUpUser(pages[1], users[1], 2);
    await signUpUser(pages[2], users[2], 3);

    await createArticle(pages[0], articleWithoutTags, 1);
    await createArticle(pages[1], articleWithOneTag, 2);
  },
);

test('User can see in Your Feed articles from two different users', async ({
  pages,
  articleWithoutTags,
  articleWithOneTag,
}) => {
  const viewArticlePage = new ViewArticlePage(pages[2], 3);
  const homePage = new HomePage(pages[2], 3);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowAuthorButton(); // follow users[0]

  await viewArticlePage.open(articleWithOneTag.url);
  await viewArticlePage.clickFollowAuthorButton(); // follow users[1]

  await homePage.open();
  await homePage.clickYourFeedTab();

  await homePage.assertArticleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleIsVisible(articleWithOneTag.title);
});
