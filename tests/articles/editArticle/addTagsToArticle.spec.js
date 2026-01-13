import { test } from '../../_fixtures/fixtures';
import {
  generateNewArticleData,
  generateTags,
} from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('Add article tags', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Add ${testNameEnding} tags to the previously created article`, async ({
      viewArticlePage,
      editArticlePage,
      logger,
      page,
    }) => {
      const article = generateNewArticleData(logger);
      const tags = generateTags(tagsNumber);

      await createArticle(page, article);

      await viewArticlePage.clickEditArticleButton();

      await editArticlePage.editTagsField(tags);
      await editArticlePage.clickUpdateArticleButton();

      await viewArticlePage.waitForNavigationAndReload();
      await viewArticlePage.assertArticleTagsAreVisible(tags);
    });
  });
});
