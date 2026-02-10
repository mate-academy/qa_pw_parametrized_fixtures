import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

test.describe('Edit article', () => {
  test.beforeEach(async ({ page, user }) => {
    await signUpUser(page, user);
  });

  for (const { tagsNumber, testNameEnding } of testParameters) {
    test(`User can remove all tags from previously created article ${testNameEnding}`, async ({
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
      await viewArticlePage.ClickEditArticleButton();

      await editArticlePage.removeTags(article.tags);
      await editArticlePage.clickUpdateArticleButton();

      await viewArticlePage.assertArticleTagsAreNotVisible(article.tags);
    });

    test(`User is able to add tags on edit to the previously created article ${testNameEnding}`, async ({
      homePage,
      createArticlePage,
      viewArticlePage,
      editArticlePage,
      logger,
    }) => {
      const articleWithoutTags = generateNewArticleData(logger, 0);
      const tagsToAdd = generateNewArticleData(logger, tagsNumber).tags;

      await homePage.clickNewArticleLink();
      await createArticlePage.fillTitleField(articleWithoutTags.title);
      await createArticlePage.fillDescriptionField(articleWithoutTags.description);
      await createArticlePage.fillTextField(articleWithoutTags.text);
      
      await createArticlePage.clickPublishArticleButton();

      await viewArticlePage.ClickEditArticleButton();

      await editArticlePage.fillTagsField(tagsToAdd);
      await editArticlePage.clickUpdateArticleButton();

      await viewArticlePage.assertArticleTagsAreVisible(tagsToAdd);
    });
  }
});
