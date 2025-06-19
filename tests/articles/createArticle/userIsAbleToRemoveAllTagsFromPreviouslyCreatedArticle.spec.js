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
  test.describe('User is able to remove all tags from previously created article', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`User is able to remove all tags from previously created article ${testNameEnding}`, async ({
      viewArticlePage,
      editArticlePage,
      logger,
      page,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);

      await createArticle(page, article);
      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.assertArticleTextIsVisible(article.text);
      await viewArticlePage.assertArticleTagsAreVisible(article.tags);

      await editArticlePage.clickEditArticleButton();
      await editArticlePage.assertArticleTagsAreDeleted(article.tags);
    });
  });
});
