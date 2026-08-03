import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('Edit article - add tags test', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`User is able to add tags on edit to the previously created article with ${testNameEnding}`, async ({
      homePage,
      createArticlePage,
      viewArticlePage,
      editArticlePage,
      logger,
    }) => {
      const article = generateNewArticleData(logger, 0);
      const { tags: tagsToAdd } = generateNewArticleData(logger, tagsNumber);

      await homePage.clickNewArticleLink();

      await createArticlePage.submitCreateArticleForm(article);
      await viewArticlePage.clickEditArticleButton();

      await editArticlePage.fillTagsField(tagsToAdd);
      await editArticlePage.clickUpdateArticleButton();
      await viewArticlePage.page.waitForURL('**/article/**');
      await viewArticlePage.page.reload();
      await viewArticlePage.assertArticleTagsAreVisible(tagsToAdd);
    });
  });
});
