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
  test.describe(`Add tags on edit to an existing article`, () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Add ${testNameEnding} on edit to an existing article`, async ({
      viewArticlePage,
      logger,
      page,
      editArticlePage,
    }) => {
      const article = generateNewArticleData(logger, 0);
      const articleWithTags = generateNewArticleData(logger, tagsNumber);
      await createArticle(page, article);

      await editArticlePage.editArticleButtonClick();
      await editArticlePage.fillTagsField(articleWithTags.tags);
      await editArticlePage.updateArticleButtonClick();
      await viewArticlePage.reload();
      await viewArticlePage.assertArticleTagsAreVisible(articleWithTags.tags);
    });
  });
});
