import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const testParameters = [
  { tagsNumber: 1, numberTags: 'one tag' },
  { tagsNumber: 2, numberTags: 'two tags' },
  { tagsNumber: 5, numberTags: 'five tags' },
];

testParameters.forEach(({ tagsNumber, numberTags }) => {
  test.describe('User is able to remove all tags from previously created article', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`User is able to remove ${numberTags} from previously created article`, async ({
      homePage,
      createArticlePage,
      viewArticlePage,
      logger,
      editArticlePage,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);

      await homePage.clickNewArticleLink();

      await createArticlePage.fillTitleField(article.title);
      await createArticlePage.fillDescriptionField(article.description);
      await createArticlePage.fillTextField(article.text);
      await createArticlePage.fillTagsField(article.tags);
      await createArticlePage.clickPublishArticleButton();

      await viewArticlePage.assertArticleTitleIsVisible(article.title);
      await viewArticlePage.assertArticleTextIsVisible(article.text);
      await viewArticlePage.assertArticleTagsAreVisible(article.tags);
      await viewArticlePage.clickEditArticleButton();
      await editArticlePage.assertArticleHasCorrectTitle(article.title);
      await editArticlePage.clickDeleteTagButton(article.tags);
      await editArticlePage.clickUpdateArticleButton();
      await viewArticlePage.assertArticleTagsAreNotVisible(article.tags);
    });
  });
});
