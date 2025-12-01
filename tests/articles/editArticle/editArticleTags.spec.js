import { test } from '../../_fixtures/fixtures';
import { expect as pwExpect } from '@playwright/test';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const variants = [
  { tagsNumber: 1, name: 'one tag' },
  { tagsNumber: 2, name: 'two tags' },
  { tagsNumber: 5, name: 'five tags' },
];

test.describe('Edit article tags', () => {
  test.beforeEach(async ({ page, user }) => {
    await signUpUser(page, user);
  });

  // 1) Remove all tags from a previously created article
  variants.forEach(({ tagsNumber, name }) => {
    test(`User can remove all tags from article created with ${name}`, async ({
      page,
      homePage,
      createArticlePage,
      viewArticlePage,
      editArticlePage,
      logger,
    }) => {
      // Create an article with N tags
      const article = generateNewArticleData(logger, tagsNumber);

      await homePage.clickNewArticleLink();
      await createArticlePage.fillTitleField(article.title);
      await createArticlePage.fillDescriptionField(article.description);
      await createArticlePage.fillTextField(article.text);
      await createArticlePage.fillTagsField(article.tags);
      await createArticlePage.clickPublishArticleButton();

      // Assert created with tags
      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.assertArticleTextIsVisible(article.text);
      await viewArticlePage.assertArticleTagsAreVisible(article.tags);

      // Go to edit
      await viewArticlePage.clickEditArticleButton();

      // Clear all tags on the editor and verify editor is clean
      await editArticlePage.clearAllTags();

      // Update article (navigates back to /article/:slug)
      await editArticlePage.clickUpdateArticleButton();

      // Assert on the view page: no tag chips
      await viewArticlePage.assertNoTagsVisible();
    });
  });

  // 2) Add tags on edit to a previously created article (created without tags)
  variants.forEach(({ tagsNumber, name }) => {
    test(`User can add ${name} on edit to a previously created article`
      , async ({
      page,
      homePage,
      createArticlePage,
      viewArticlePage,
      editArticlePage,
      logger,
    }) => {
      // Create an article with 0 tags
      const articleNoTags = generateNewArticleData(logger, 0);

      await homePage.clickNewArticleLink();
      await createArticlePage.fillTitleField(articleNoTags.title);
      await createArticlePage.fillDescriptionField(articleNoTags.description);
      await createArticlePage.fillTextField(articleNoTags.text);
      await createArticlePage.clickPublishArticleButton();

      // Assert created without tags
      await viewArticlePage.assertArticleTitleIsVisible(articleNoTags.title);
      await viewArticlePage.assertArticleTextIsVisible(articleNoTags.text);
      await viewArticlePage.assertNoTagsVisible();

      // Edit → add tags → update
      const tagsToAdd = generateNewArticleData(logger, tagsNumber).tags;

      await viewArticlePage.clickEditArticleButton();
      await editArticlePage.fillTagsField(tagsToAdd);
      await page.waitForTimeout(2500);
      await editArticlePage.clickUpdateArticleButton();
      await viewArticlePage.assertArticleTagsAreVisible(tagsToAdd);
    });
  });
});
