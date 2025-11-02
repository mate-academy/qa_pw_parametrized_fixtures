import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

const testParametersRemoveTags = [
  { tagsNumber: 1, testNameEnding: 'remove all tags from previously created article with one tag.' },
  { tagsNumber: 2, testNameEnding: 'remove all tags from previously created article with two tags.' },
  { tagsNumber: 5, testNameEnding: 'remove all tags from previously created article with five tags.' },
];

const testParametersAddNewTags = [
  { tagsNumber: 1, testNameEnding: 'add tags on edit to the previously created article with one tag.' },
  { tagsNumber: 2, testNameEnding: 'add tags on edit to the previously created article with two tags .' },
  { tagsNumber: 5, testNameEnding: 'add tags on edit to the previously created article with five tags.' },
];

testParametersRemoveTags.forEach(({tagsNumber, testNameEnding}) => {
  test.describe('User is able to remove tags in created article', async() => {
    let article;

    test.beforeEach(async ({page, user, logger}) => {
      await signUpUser(page, user);
      article = generateNewArticleData(logger, tagsNumber);
      await createArticle(page, article);
    });

    test(`User is able to ${testNameEnding}`, async ({ viewArticlePage, createArticlePage, articleWithOneTag }) => {
        await viewArticlePage.open(article.url);
        await viewArticlePage.clickEditArticleButton();
        await createArticlePage.fillTagsField(articleWithOneTag.tags);
        await createArticlePage.clickUpdateArticleButton();
        await viewArticlePage.open(article.url);
        await viewArticlePage.assertArticleTagsAreVisible([...article.tags, ...articleWithOneTag.tags]);
    });
  });
});

testParametersAddNewTags.forEach(({tagsNumber, testNameEnding}) => {
  test.describe('User is able to add tags in created article', async() => {
    let article;

    test.beforeEach(async ({page, user, logger}) => {
      await signUpUser(page, user);
      article = generateNewArticleData(logger, tagsNumber);
      await createArticle(page, article);
    });

    test(`User is able to ${testNameEnding}`, async ({ viewArticlePage, createArticlePage }) => {
        await viewArticlePage.open(article.url);
        await viewArticlePage.clickEditArticleButton();
        await createArticlePage.removeAllTags();
        await createArticlePage.clickUpdateArticleButton();
        await viewArticlePage.open(article.url);
        await viewArticlePage.assertArticleTagsAreHidden([...article.tags]);
    });
  });
});