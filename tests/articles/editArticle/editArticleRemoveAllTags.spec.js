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
  test.describe(`Remove all tags from an article`, () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Remove all tags from an article with ${testNameEnding}`, async ({
      viewArticlePage,
      logger,
      page,
      editArticlePage,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);
      await createArticle(page, article);

      await editArticlePage.editArticleButtonClick();
      await editArticlePage.deleteTagButton(article.tags);
      await editArticlePage.updateArticleButtonClick();
      await viewArticlePage.reload();
      await viewArticlePage.assertArticleHasNoTags();
    });
  });
});
