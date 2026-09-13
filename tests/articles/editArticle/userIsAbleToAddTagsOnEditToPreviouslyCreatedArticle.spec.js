import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

const testParameters = [
  { tagsNumber: 1, numberTags: 'one tag' },
  { tagsNumber: 2, numberTags: 'two tags' },
  { tagsNumber: 5, numberTags: 'five tags' },
];

testParameters.forEach(({ tagsNumber, numberTags }) => {
  let article;
  test.describe('User is able to add tags on edit to the previously created article', () => {
    test.beforeEach(async ({ page, user, logger }) => {
      await signUpUser(page, user);
      const articleData = generateNewArticleData(logger);
      article = await createArticle(page, articleData);
    });

    test(`User is able to add ${numberTags} on edit to the previously created article`, async ({
      viewArticlePage,
      editArticlePage,
      logger,
      page,
    }) => {
      const newArticleData = generateNewArticleData(logger, tagsNumber);

      await viewArticlePage.clickEditArticleButton();
      await editArticlePage.assertArticleHasCorrectTitle(article.title);
      await editArticlePage.enterTagsIntoField(newArticleData.tags);
      await editArticlePage.clickUpdateArticleButton();
      await page.waitForURL(/\/article\//);
      await page.reload();
      await viewArticlePage.assertArticleTagsAreVisible(newArticleData.tags);
    });
  });
});
