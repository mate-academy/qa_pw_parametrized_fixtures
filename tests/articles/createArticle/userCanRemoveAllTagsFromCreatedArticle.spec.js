import { test } from '../../_fixtures/createArticleFixture';

const tagsCount = [1, 2, 5];

tagsCount.forEach(count => {
  test.describe(`Testing article with ${count} tags`, () => {
    test.use({ tagNumber: count });

    test(`User can remove ${count} tags from created article`, async ({
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
      await editArticlePage.assertArticleTagIsHere();
      await editArticlePage.clickOnRemoveTagButton(count);
      await editArticlePage.updateArticleButton();
      await page.waitForTimeout(2000);
      await viewArticlePage.assertArticleTextIsVisible(
        createArticleWithYourTagNumber.text,
      ),
        await viewArticlePage.assertArticleTagsAreHidden();
    });
  });
});
