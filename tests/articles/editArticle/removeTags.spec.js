import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('Edit article - remove tags test', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`User is able to add tags on edit to the previously created article with  ${testNameEnding}`, async ({
      homePage,
      createArticlePage,
      viewArticlePage,
      editArticlePage,
      logger,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);

      await homePage.clickNewArticleLink();

      await createArticlePage.submitCreateArticleForm(article);
      await viewArticlePage.clickEditArticleButton();
      await editArticlePage.clearTagsField();
      await editArticlePage.clickUpdateArticleButton();
      await viewArticlePage.page.waitForURL('**/article/**');
      await viewArticlePage.page.reload();
      await viewArticlePage.assertArticleTagsAreNotVisible(article.tags);
    });
  });
});
