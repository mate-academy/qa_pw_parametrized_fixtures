import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

const testParameters = [
  { tags: ['tag1'], testNameEnding: 'one tag' },
  { tags: ['tag1', 'tag2'] , testNameEnding: 'two tags' },
  { tags: ['tag1', 'tag2', 'tag3'], testNameEnding: 'five tags' },
];

testParameters.forEach(({ tags, testNameEnding }) => {
  test.describe('Create and article with tags', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Add ${testNameEnding} to previously created article`, async ({
      viewArticlePage,
      logger,
      page,
      createArticlePage,
    }) => {
      const article = generateNewArticleData(logger);
      await createArticle(page, article);
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.fillTagsField(tags);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.reload();// needed due to pw fast navigation
      await viewArticlePage.assertArticleTagsAreVisible(tags);
    });
  });
});
