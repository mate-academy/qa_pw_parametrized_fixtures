import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];
let article;

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('remove all tags from previously created article', () => {
    test.beforeEach(async ({ page, user, logger }) => {
      article = generateNewArticleData(logger, tagsNumber);

      await signUpUser(page, user);
      await createArticle(page, article);
    });

    test(`Remove tags from article with ${testNameEnding}`, async ({
      viewArticlePage,
      editArticlePage,
      page
    }) => {

      await viewArticlePage.clickEditArticleLink();
      await editArticlePage.removeArticleTags(article.tags);
      await editArticlePage.clickUpdateArticleButton();
      await viewArticlePage.assertTagsListHasNoTags();
    });
  });
});
