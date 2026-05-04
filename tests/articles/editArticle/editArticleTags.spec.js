import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  let article;

  test.describe(`Edit article with ${testNameEnding}`, () => {
    test.beforeEach(async ({ page, user, logger }) => {
      await signUpUser(page, user);
      article = generateNewArticleData(logger, tagsNumber);
      await createArticle(page, article);
    });

    test('Remove all tags from previously created article', async ({
      viewArticlePage,
      editArticlePage,
    }) => {
      await viewArticlePage.clickEditArticleButton();
      await editArticlePage.removeTags(article.tags);
      await editArticlePage.clickUpdateArticleButton();
      await viewArticlePage.assertArticleTagsAreNotVisible(article.tags);
    });

    test('Add tags on edit to the previously created article', async ({
      page,
      viewArticlePage,
      editArticlePage,
    }) => {
      const newTags = Array.from({ length: tagsNumber }, () =>
        faker.lorem.word(),
      );

      await viewArticlePage.clickEditArticleButton();
      await editArticlePage.fillTagsField(newTags);
      await editArticlePage.clickUpdateArticleButton();

      // Conduit serves stale article data after redirect — force a refresh
      await page.waitForURL(/\/article\//);
      await page.reload();

      await viewArticlePage.assertArticleTagsAreVisible(newTags);
    });
  });
});
