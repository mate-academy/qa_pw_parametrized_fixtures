import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../../src/ui/actions/article/createNewArticle';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('Edit article - add tags', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    // eslint-disable-next-line max-len
    test(`User is able to add ${testNameEnding} on edit to the previously created article`, async ({
      page,
      homePage,
      createArticlePage,
      viewArticlePage,
      editArticlePage,
      logger,
    }) => {
      const articleWithoutTags = generateNewArticleData(logger, 0);
      const articleWithTags = generateNewArticleData(logger, tagsNumber);

      await homePage.clickNewArticleLink();
      await createNewArticle(page, articleWithoutTags);
      await createArticlePage.clickPublishArticleButton();

      await viewArticlePage.editArticleButtonClick();

      await editArticlePage.fillTagsField(articleWithTags.tags);
      await editArticlePage.clickUpdateArticleButton();

      await viewArticlePage.editArticleButtonClick();
      await editArticlePage.assertArticleTagsAreVisible(articleWithTags.tags);
    });
  });
});