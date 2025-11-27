import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe(`Edit article an article with ${testNameEnding}`, () => {
    let article
    let tags
    test.beforeEach(async ({ 
      page, 
      user, 
      articleWithOneTag,
      articleWithTwoTags,
      articleWithFiveTags,
      articleWithoutTags
    }, testInfo) => {

      if (testInfo.title.includes("Remove")){
        article = tagsNumber === 1
        ? articleWithOneTag
        : tagsNumber === 2
          ? articleWithTwoTags
          : articleWithFiveTags;
      } else {
        article = articleWithoutTags;
      }

      if (testInfo.title.includes("Add")){
        tags = tagsNumber === 1
        ? articleWithOneTag.tags
        : tagsNumber === 2
          ? articleWithTwoTags.tags
          : articleWithFiveTags.tags;
      }
      await signUpUser(page, user);
      await createArticle(page, article);
    });

    test(`Remove all tags from article with ${testNameEnding}`, async ({
      viewArticlePage,
      editArticlePage,
      page
    }) => {
      await viewArticlePage.clickEditArticleButton();
      await editArticlePage.deleteTags(article.tags);
      await editArticlePage.clickUpdateArticleButton();
      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.assertArticleTextIsVisible(article.text);
      await viewArticlePage.assertTagsAreNotVisible(article.tags);
      
    });

    test(`Add ${testNameEnding} tags on edit to the previously created article.`, async ({
      viewArticlePage,
      editArticlePage,
      page
    }) => {
      await viewArticlePage.clickEditArticleButton();
      await editArticlePage.fillInTags(tags);
      await editArticlePage.clickUpdateArticleButton();
      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.assertArticleTextIsVisible(article.text);
      await viewArticlePage.assertArticleTagsAreVisible(tags);
    });
  });
});
