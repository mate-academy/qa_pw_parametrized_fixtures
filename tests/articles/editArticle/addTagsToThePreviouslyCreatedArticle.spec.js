import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const testParameters = [
  { TagsNumber: 1, testNameEnding: 'one tag' },
  { TagsNumber: 2, testNameEnding: 'two tags' },
  { TagsNumber: 5, testNameEnding: 'five tags' },
];
testParameters.forEach(({ TagsNumber, testNameEnding }) => {
  test.describe('Remove all tags from previously created article', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Add tags on edit to the previously created article ${testNameEnding}`, async ({
      page,
      homePage,
      createArticlePage,
      viewArticlePage,
      editArticlePage,
      logger,
    }) => {
      const article = generateNewArticleData(logger, TagsNumber);
      const newArticle = generateNewArticleData(logger, 2);

      await homePage.clickNewArticleLink();

      await createArticlePage.fillTitleField(article.title);
      await createArticlePage.fillDescriptionField(article.description);
      await createArticlePage.fillTextField(article.text);
      await createArticlePage.fillTagsField(article.tags);
      await createArticlePage.clickPublishArticleButton();

      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.assertArticleTextIsVisible(article.text);
      await viewArticlePage.assertArticleTagsAreVisible(article.tags);

      await viewArticlePage.clickEditArticleButton();

      await editArticlePage.fillTagsField(newArticle.tags);
      await editArticlePage.clickUpdateArticleButton();

      await page.waitForURL(`**/article/**`);
      await page.reload();

      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.assertArticleTextIsVisible(article.text);
      await viewArticlePage.assertArticleTagsAreVisible(newArticle.tags);
    });
  });
});
