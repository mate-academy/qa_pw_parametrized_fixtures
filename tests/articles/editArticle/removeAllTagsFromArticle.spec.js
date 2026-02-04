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
  test.describe('Remove all tags from previously created article', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(
      `Remove all tags from article with ${testNameEnding}`,
      async ({
        page,
        logger,
        createArticlePage,
        viewArticlePage,
      }) => {
        const article = generateNewArticleData(logger, tagsNumber);
        await createArticle(page, article);

        const slug = getSlugFromArticleUrl(article.url);

        await createArticlePage.openForEdit(slug);
        await createArticlePage.removeAllTags();
        await createArticlePage.clickSubmitButton();

        await viewArticlePage.open(article.url);
        await viewArticlePage.assertArticleTitleIsVisible(article.title);
        await viewArticlePage.assertArticleTextIsVisible(article.text);
        await viewArticlePage.assertArticleTagsAreNotVisible(article.tags);
      },
    );
  });
});
