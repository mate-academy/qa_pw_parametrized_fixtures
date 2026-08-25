import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
 
const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('User is able to add tags on article edit', () => {
    test.beforeEach(async ({ page, user, articleWithoutTags }) => {
      await signUpUser(page, user);
      await createArticle(page, articleWithoutTags);
    });

    test(`Add ${testNameEnding} on edit`, async ({
      viewArticlePage,
      articleWithoutTags,
      editArticlePage,
      logger,
    }) => {

      const articleWithTags = generateNewArticleData(logger, tagsNumber);

      await viewArticlePage.open(articleWithoutTags.url);

      await viewArticlePage.clickEditArticle();

      await editArticlePage.updateTagsField(articleWithTags.tags);

      await editArticlePage.clickUpdateArticleButton();

      await viewArticlePage.assertArticleTagsAreVisible(
        articleWithTags.tags,
      );
    });
  });
});
