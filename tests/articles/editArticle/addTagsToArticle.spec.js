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
  test.describe('Add tags to article', () => {
    let createdArticle;
    let newTags;

    test.beforeEach(async ({ page, user, logger }) => {
      await signUpUser(page, user);
      createdArticle = generateNewArticleData(logger, 0);
      await createArticle(page, createdArticle);
      newTags = generateNewArticleData(logger, tagsNumber).tags;
    });

    test(`User is able to add ${testNameEnding} on edit to the previously created article`, async ({
      viewArticlePage,
      editArticlePage,
    }) => {

      await viewArticlePage.clickEditArticleButton();

      await editArticlePage.fillTagsField(newTags);
      await editArticlePage.clickUpdateArticleButton();

      await viewArticlePage.assertArticleTitleIsVisible(createdArticle.title);
      await viewArticlePage.assertArticleTagsAreVisible(newTags);
    });
  });
});
