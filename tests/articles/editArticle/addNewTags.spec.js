import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { faker } from '@faker-js/faker';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];
let article;
let newTag;

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('add tags on edit to the previously created article', () => {
    test.beforeEach(async ({ page, user, logger }) => {
      article = generateNewArticleData(logger, tagsNumber);
      newTag = faker.lorem.word();
      article.tags.push(newTag);

      await signUpUser(page, user);
      await createArticle(page, article);
    });

    test(`Add new tag to article with ${testNameEnding}`, async ({
      viewArticlePage,
      editArticlePage,
      page
    }) => {

      await viewArticlePage.clickEditArticleLink();
      await editArticlePage.fillTagsInputField(newTag);
      await editArticlePage.clickUpdateArticleButton();
      await viewArticlePage.assertArticleTagsAreVisible(article.tags);
    });
  });
});
