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
  test.describe('Add tags on edit to the previously created article', () => {
    test.beforeEach(async ({ page, user, articleWithoutTags }) => {
      await signUpUser(page, user);
      await createArticle(page, articleWithoutTags);
    });

    test(`Add ${testNameEnding} on edit to the previously created article`, async ({
      createArticlePage,
      viewArticlePage,
      articleWithoutTags,
      logger,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);

      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.fillTagsField(article.tags);
      await createArticlePage.clickUpdateArticleButton();

      await viewArticlePage.open(articleWithoutTags.url);
      await viewArticlePage.assertArticleTagsAreVisible(article.tags);
    });
  });
});