import { test } from '../../_fixtures/fixtures';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { generateNewArticleData, generateTagsArray } from '../../../src/common/testData/generateNewArticleData';

test.beforeEach(async({ page, user}) => {
    await signUpUser(page, user);
});

const parameters = [
    { tagsNumber: 1, testName: 'one tag' },
    { tagsNumber: 2, testName: 'two tags' },
    { tagsNumber: 5, testName: 'five tags' },
];

parameters.forEach(({ tagsNumber, testName}) => {
    test(`User is able to remove ${testName} tags from previously created article`, async({page, viewArticlePage, logger}) => {
        const article = generateNewArticleData(logger, tagsNumber);
        await createArticle(page, article);
        await viewArticlePage.assertArticleTitleIsVisible(article.title);
        const editArticlePage = new EditArticlePage(page);
        await viewArticlePage.openEditArticlePage();
        await editArticlePage.removeTags();
        await editArticlePage.updateArticle();
        await viewArticlePage.assertTagsAreRemoved();
    });
})