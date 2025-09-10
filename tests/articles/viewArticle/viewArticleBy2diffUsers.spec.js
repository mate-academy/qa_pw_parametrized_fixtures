import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 3, usersNumber: 3 });

const testParameters = [
  { pageIndex: 1, userId: 2 },
  { pageIndex: 2, userId: 3 },
];

test.describe(`View article by other users`, () => {
  test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
    await signUpUser(pages[0], users[0], 1);
    await signUpUser(pages[1], users[1], 2);
    await signUpUser(pages[2], users[2], 3);
    await createArticle(pages[0], articleWithoutTags, 1);
  });
  testParameters.forEach(({ pageIndex, userId }) => {
    test(`Check view article as user ${userId}`, async ({
      articleWithoutTags,
      pages,
      users,
    }) => {
      const viewArticlePage = new ViewArticlePage(pages[pageIndex], userId);

      await viewArticlePage.open(articleWithoutTags.url);

      await viewArticlePage.assertArticleTitleIsVisible(
        articleWithoutTags.title,
      );
      await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
      await viewArticlePage.assertArticleAuthorNameIsVisible(users[0].username);
    });
  });
});
