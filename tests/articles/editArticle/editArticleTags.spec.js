import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe(`Edit article with ${testNameEnding}`, () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`User is able to remove all tags (${testNameEnding})`, async ({
      homePage,
      createArticlePage,
      viewArticlePage,
      editArticlePage,
      logger,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);

      await homePage.clickNewArticleLink();
      await createArticlePage.fillTitleField(article.title);
      await createArticlePage.fillDescriptionField(article.description);
      await createArticlePage.fillTextField(article.text);
      await createArticlePage.fillTagsField(article.tags);
      await createArticlePage.clickPublishArticleButton();

      await viewArticlePage.assertArticleTagsAreVisible(article.tags);
      await viewArticlePage.clickEditArticleLink();

      await editArticlePage.clearTags();
      await editArticlePage.clickUpdateArticleButton();

      await viewArticlePage.assertArticleTagsAreVisible([]);
    });

    test(`User can add ${testNameEnding} in edit article`, async ({
      homePage,
      createArticlePage,
      viewArticlePage,
      editArticlePage,
      logger,
    }) => {
      const article = generateNewArticleData(logger, 0);
      const tagsToAdd = generateNewArticleData(logger, tagsNumber).tags;

      await homePage.clickNewArticleLink();
      await createArticlePage.fillTitleField(article.title);
      await createArticlePage.fillDescriptionField(article.description);
      await createArticlePage.fillTextField(article.text);
      await createArticlePage.clickPublishArticleButton();

      await viewArticlePage.clickEditArticleLink();
      await editArticlePage.fillTagsField(tagsToAdd);
      await editArticlePage.clickUpdateArticleButton();

      await viewArticlePage.assertArticleTagsAreVisible(tagsToAdd);
    });
  });
});
