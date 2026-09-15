import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];
testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe(`Remove tags feature - ${testNameEnding}`, () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Remove all Tags from created article with ${testNameEnding}`, async ({
      homePage,
      editArticlePage,
      createArticlePage,
      viewArticlePage,
      logger,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);

      await homePage.clickNewArticleLink();

      await createArticlePage.fillTitleField(article.title);
      await createArticlePage.fillDescriptionField(article.description);
      await createArticlePage.fillTextField(article.text);
      await createArticlePage.fillTagsField(article.tags);
      await createArticlePage.clickPublishArticleButton();

      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.assertArticleTagsAreVisible(article.tags);

      await viewArticlePage.clickEditArticleButton();

      for (let i = 0; i < tagsNumber; i++) {
        await editArticlePage.removeArticleTag();
      }
      await editArticlePage.clickUpdateArticleButton();
      await viewArticlePage.assertArticleTagsAreNotVisible();
    });
  });
});
