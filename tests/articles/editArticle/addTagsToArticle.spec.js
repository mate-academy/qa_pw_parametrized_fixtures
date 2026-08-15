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
  test.describe('Add tags to article', () => {
    test.beforeEach(async ({ page, user, articleWithoutTags }) => {
      await signUpUser(page, user);
      await createArticle(page, articleWithoutTags);
    });

    test(`Add ${testNameEnding} to article`, async ({
      homePage,
      viewArticlePage,
      articleWithoutTags,
      editArticlePage,
      logger,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);

      await viewArticlePage.open(articleWithoutTags.url);
      await viewArticlePage.clickEditArticleButton();

      await editArticlePage.waitForOpened();
      await editArticlePage.addTags(article.tags);
      await editArticlePage.clickUpdateArticleButton();

      await viewArticlePage.assertArticleTagsAreVisible(article.tags);
    });
  });
});
