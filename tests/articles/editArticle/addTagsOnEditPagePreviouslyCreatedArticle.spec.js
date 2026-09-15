import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];
testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe(`Add tags on edit feature - ${testNameEnding}`, () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`AddTags on editPage to createdArticl with ${testNameEnding}`, async ({
      homePage,
      editArticlePage,
      createArticlePage,
      viewArticlePage,
      logger,
    }) => {
      const initialArticle = generateNewArticleData(logger, 0);

      await homePage.clickNewArticleLink();

      await createArticlePage.fillTitleField(initialArticle.title);
      await createArticlePage.fillDescriptionField(initialArticle.description);
      await createArticlePage.fillTextField(initialArticle.text);
      await createArticlePage.fillTagsField(initialArticle.tags);
      await createArticlePage.clickPublishArticleButton();

      await viewArticlePage.assertArticleTitleIsVisible(initialArticle.title);

      await viewArticlePage.clickEditArticleButton();

      const updatedArticle = generateNewArticleData(logger, tagsNumber);

      for (const tag of updatedArticle.tags) {
        await editArticlePage.addArticleTagsField(tag);
      }
      await editArticlePage.clickUpdateArticleButton();

      await viewArticlePage.assertArticleTagsAreVisible(initialArticle.tags);
    });
  });
});
