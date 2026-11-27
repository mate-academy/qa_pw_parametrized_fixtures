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
  test.describe('Remove tags from article', () => {
    let article;

    test.beforeEach(async ({ page, user, logger }) => {
      await signUpUser(page, user);
      article = generateNewArticleData(logger, tagsNumber);
      await createArticle(page, article);
    });

  test(`Remove all tags from article with ${testNameEnding}`,
       async ({ viewArticlePage, editArticlePage }) => {
      await viewArticlePage.assertArticleTagsAreVisible(article.tags);
      await viewArticlePage.clickEditArticleButton();
      await viewArticlePage.clickEditArticleButton();
      await editArticlePage.deleteAllTags();
      await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.open(article.url);
    await viewArticlePage.assertArticleTagsAreNotVisible(article.tags);
    });

  });
});