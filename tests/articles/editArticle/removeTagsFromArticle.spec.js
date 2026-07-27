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
  test.describe('Edit article - remove tags', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    // eslint-disable-next-line max-len
    test(`User is able to remove all tags from previously created article with ${testNameEnding}`, async ({
      page,
      homePage,
      createArticlePage,
      viewArticlePage,
      editArticlePage,
      logger,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);

      await homePage.clickNewArticleLink();
      await createNewArticle(page, article);
      await createArticlePage.clickPublishArticleButton();

      await viewArticlePage.editArticleButtonClick();

      for (const tag of article.tags) {
        await editArticlePage.removeTag(tag);
      }

      await editArticlePage.clickUpdateArticleButton();

      await viewArticlePage.editArticleButtonClick();
      await editArticlePage.assertNoTagsAreVisible();
    });
  });
});