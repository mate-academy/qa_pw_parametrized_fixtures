import { test } from '../../_fixtures/fixtures';
import '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'with one tag' },
  { tagsNumber: 2, testNameEnding: 'with two tags' },
  { tagsNumber: 5, testNameEnding: 'with five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe(`Remove all tags ${testNameEnding}`, () => {
    test(`Remove all tags ${testNameEnding}`, async ({
      page,
      user,
      viewArticlePage,
      editArticlePage,
      logger,
    }) => {
      await signUpUser(page, user);
      const articleWithTags = generateNewArticleData(logger, tagsNumber);
      await createArticle(page, articleWithTags, 1);
      await viewArticlePage.clickEditArticleButton();
      await editArticlePage.removeAllTags(articleWithTags.tags);
      await editArticlePage.updateArticle();
      await viewArticlePage.assertArticleHasNoTags(articleWithTags.tags);
    });
  });
});
