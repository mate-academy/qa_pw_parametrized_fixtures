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
  test.describe('Create and article with tags', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Remove all tags from article with: ${testNameEnding}`, async ({
      viewArticlePage,
      logger,
      page,
      createArticlePage,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);
      await createArticle(page, article);
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.removeAllTagsFromArticle(article.tags);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.reload();// needed due to pw fast navigation
      await viewArticlePage.assertArticleTagsAreNotVisible(article.tags);
    });
  });
});
