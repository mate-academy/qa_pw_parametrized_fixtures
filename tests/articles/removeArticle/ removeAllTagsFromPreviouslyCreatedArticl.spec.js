import { test } from '../../_fixtures/fixtures';
import {generateNewArticleData} from '../../../src/common/testData/generateNewArticleData';
import {generateNewUserData} from '../../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';


let article;
const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding  }) => {
  test.describe('Create and article with tags', () => {
    test.beforeEach(async ({ page, user, logger }) => {
      await signUpUser(page, user);
      article = generateNewArticleData(logger);
      await createArticle(page, article);
    });

    test(`Create an article with ${testNameEnding}`, async ({
      homePage,
      createArticlePage,
      viewArticlePage,
      editArticlePage,
      logger,
    }) => {

        const newTags = generateNewArticleData(logger, tagsNumber);
        await viewArticlePage.clickEditArticleButton();
        await editArticlePage.fillTagField(newTags.tags);
        await editArticlePage.clickUpdateArticleButton();
    
        await viewArticlePage.page.waitForTimeout(1000);
        await viewArticlePage.page.reload();


        await viewArticlePage.clickEditArticleButton();
        for (const tag of newTags.tags) {
        await editArticlePage.clickOnDeleteTag(tag);

        }
        await editArticlePage.clickUpdateArticleButton();
        await viewArticlePage.page.waitForTimeout(1000);
        await viewArticlePage.page.reload();

        await viewArticlePage.assertTagIsNotVisible(newTags.tags);
        

 });
  });
});