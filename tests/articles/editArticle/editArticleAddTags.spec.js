import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { addArticleTags } from '../../../src/ui/actions/articles/addArticleTags';

const testParameters = [
  { tagsNumber: 1, additionalTags: ['1', '2', '3'], testNameEnding: 'one tag' },
  { tagsNumber: 2, additionalTags: ['one', 'six'], testNameEnding: 'two tags' },
  { tagsNumber: 10, additionalTags: ['eleven'], testNameEnding: 'ten tags' },
];

testParameters.forEach(({ tagsNumber, additionalTags, testNameEnding }) => {
  test.describe('Create and article with tags', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Create an article with ${testNameEnding}`, async ({
      homePage,
      createArticlePage,
      viewArticlePage,
      logger,
      page,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);

      await homePage.clickNewArticleLink();

      await createArticlePage.fillTitleField(article.title);
      await createArticlePage.fillDescriptionField(article.description);
      await createArticlePage.fillTextField(article.text);
      await createArticlePage.fillTagsField(article.tags);
      await createArticlePage.clickPublishArticleButton();

      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.assertArticleTextIsVisible(article.text);
      await viewArticlePage.assertArticleTagsAreVisible(article.tags);

      await test.step('Add tags and check them all', async () => {
        await addArticleTags(page, additionalTags);
        const allTags = [...article.tags, ...additionalTags];

        await viewArticlePage.assertArticleTitleIsVisible(article.title);
        await viewArticlePage.assertArticleTextIsVisible(article.text);
        await viewArticlePage.assertArticleTagsAreVisible(allTags);
      });
    });
  });
});
