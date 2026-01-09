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
  test.describe('Remove tags from article', () => {
    let createdArticle;

    test.beforeEach(async ({ page, user, logger }) => {
      await signUpUser(page, user);
      createdArticle = generateNewArticleData(logger, tagsNumber);
      await createArticle(page, createdArticle);
    });

    test(`User is able to remove all tags from previously created article with ${testNameEnding}`, async ({
      viewArticlePage,
      editArticlePage,
      page,
    }) => {
      await viewArticlePage.clickEditArticleButton();

      await page.waitForLoadState('networkidle');

      await editArticlePage.removeAllTags(createdArticle.tags);
      await editArticlePage.clickUpdateArticleButton();

      await page.waitForTimeout(2000);

      await viewArticlePage.assertArticleHasNoTags();
    });
  });
});
