import { test } from '../../_fixtures/createArticleFixture';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

const tagsCount = [1, 2, 5];

tagsCount.forEach(count => {
  test.describe(`Testing article with ${count} tags`, () => {
    test.use({ tagNumber: count });

    test(`User can add ${count} tags to created article`, async ({
      createArticleWithYourTagNumber,
      viewArticlePage,
      editArticlePage,
      page,
    }) => {
      await viewArticlePage.assertArticleTitleIsVisible(
        createArticleWithYourTagNumber.title,
      );
      await viewArticlePage.assertArticleTextIsVisible(
        createArticleWithYourTagNumber.text,
      );
      await viewArticlePage.assertArticleTagsAreVisible(
        createArticleWithYourTagNumber.tags,
      );

      await viewArticlePage.clickOnEditArticleButton();
      await page.waitForTimeout(2000);
      const newTags = generateNewArticleData(count).tags;
      await editArticlePage.fillTagsField(newTags);
      await editArticlePage.updateArticleButton();
      await page.waitForTimeout(2000);
      await viewArticlePage.assertArticleTagsAreVisible();
    });
  });
});
