import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

function getSlugFromArticleUrl(url) {
  return url.split('/').filter(Boolean).pop();
}

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('Add tags on edit to the previously created article', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(
      `Add tags on edit to article with ${testNameEnding}`,
      async ({
        page,
        logger,
        createArticlePage,
        viewArticlePage,
      }) => {
        const article = generateNewArticleData(logger, 0);
        await createArticle(page, article);

        const slug = getSlugFromArticleUrl(article.url);
        const tagsToAdd = generateNewArticleData(logger, tagsNumber).tags;

        await createArticlePage.openForEdit(slug);
        await createArticlePage.fillTagsField(tagsToAdd);
        await createArticlePage.clickSubmitButton();

        await viewArticlePage.open(article.url);
        await viewArticlePage.assertArticleTitleIsVisible(article.title);
        await viewArticlePage.assertArticleTextIsVisible(article.text);
        await viewArticlePage.assertArticleTagsAreVisible(tagsToAdd);
      },
    );
  });
});
