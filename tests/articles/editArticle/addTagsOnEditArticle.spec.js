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
  test.describe('Add tags to article by editing', () => {
    let article;
    let tags;

    test.beforeEach(async ({ page, user, logger }) => {
      await signUpUser(page, user);
      article = generateNewArticleData(logger);
      tags = generateNewArticleData(logger, tagsNumber).tags;
      await createArticle(page, article);
    });

  test(`Add tags to article with ${testNameEnding} by editing`,
       async ({ viewArticlePage, editArticlePage }) => {

      await viewArticlePage.clickEditArticleButton();
      await editArticlePage.fillTagsField(tags);
      await editArticlePage.clickUpdateArticleButton();
      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.open(article.url);
      await viewArticlePage.assertArticleTagsAreVisible(tags);
    });

  });
});