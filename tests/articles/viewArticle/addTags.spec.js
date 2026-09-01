import { test } from '../../_fixtures/fixtures';
import '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'with one tag' },
  { tagsNumber: 2, testNameEnding: 'with two tags' },
  { tagsNumber: 5, testNameEnding: 'with five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe(`Add tags ${testNameEnding}`, () => {
    test(`Add tags ${testNameEnding}`, async ({
      page,
      user,
      viewArticlePage,
      editArticlePage,
      logger,
    }) => {
      await signUpUser(page, user);
      const articleWithoutTags = generateNewArticleData(logger, 0);
      await createArticle(page, articleWithoutTags, 1);
      const tagsToAdd = generateNewArticleData(logger, tagsNumber).tags;
      await viewArticlePage.clickEditArticleButton();
      await editArticlePage.waitForArticleToLoad(articleWithoutTags.title);
      await editArticlePage.addTags(tagsToAdd);

      await editArticlePage.updateArticle();
      await viewArticlePage.assertArticleTagsAreVisible(tagsToAdd);
    });
  });
});
