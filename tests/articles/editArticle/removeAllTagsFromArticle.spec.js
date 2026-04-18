import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  let article;

  test.describe('User is able to remove all tags from previously created article', () => {
    test.beforeEach(
      `Prepare an article with ${testNameEnding}`,
      async ({ page, homePage, createArticlePage, logger, user }) => {
        await signUpUser(page, user);

        article = generateNewArticleData(logger, tagsNumber);

        await homePage.clickNewArticleLink();

        await createArticlePage.fillTitleField(article.title);
        await createArticlePage.fillDescriptionField(article.description);
        await createArticlePage.fillTextField(article.text);
        await createArticlePage.fillTagsField(article.tags);
        await createArticlePage.clickPublishArticleButton();
      },
    );

    test(`Remove tags from an article with ${testNameEnding}`, async ({
      editArticlePage,
      viewArticlePage,
    }) => {
      await viewArticlePage.clickEditArticleButton();
      await editArticlePage.removeArticleTags(article.tags);
      await editArticlePage.clickUpdateArticleButton();
      await viewArticlePage.assertArticleTagsAreNotVisible(article.tags);
    });
  });
});
