import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('Remove all article tags', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Remove all tags from previously created article with ${testNameEnding}`, async ({
      viewArticlePage,
      editArticlePage,
      logger,
      page,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);

      await createArticle(page, article);

      await viewArticlePage.clickEditArticleButton();

      await editArticlePage.removeAllArticleTags(article.tags);
      await editArticlePage.clickUpdateArticleButton();

      await viewArticlePage.waitForNavigationAndReload();
      await viewArticlePage.assertAllArticleTagsAreRemoved();
    });
  });
});
