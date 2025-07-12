import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

const articleTagParameters = [
  { tagNumber: 1, partOftestName: 'one tag' },
  { tagNumber: 2, partOftestName: 'two tags' },
  { tagNumber: 5, partOftestName: 'five tags' },
];

test.beforeEach(async ({ user, page, articleWithoutTags,}) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithoutTags);
});

articleTagParameters.forEach(({ tagNumber, partOftestName}) =>{
  test(`User add ${partOftestName} to exist article`, async ({
    page,
    viewArticlePage
  }) => {

    const articleTags = generateNewArticleData(undefined, tagNumber).tags;
    const editArticlePage = new EditArticlePage(page);
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.addTags(articleTags);
    await editArticlePage.clickUpdateButton();
    await viewArticlePage.refreshPageForUpdateArticlePage();
    await viewArticlePage.assertArticleTagsAreVisible(articleTags);

  });

});