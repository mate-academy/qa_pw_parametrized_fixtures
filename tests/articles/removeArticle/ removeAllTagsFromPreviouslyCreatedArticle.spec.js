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
  test.describe('Removing tags from a previously created article', () => {
    test.beforeEach(async ({ page, user, logger }) => {
      await signUpUser(page, user);
      article = generateNewArticleData(logger);
      await createArticle(page, article);
    });

    test(`User is able to remove all tags from previously created article`, async ({
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