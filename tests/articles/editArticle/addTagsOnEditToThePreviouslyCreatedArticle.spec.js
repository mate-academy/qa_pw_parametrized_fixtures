import { test } from '../../_fixtures/fixtures';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { generateTagsArray } from '../../../src/common/testData/generateNewArticleData';
import { expect } from '@playwright/test';


const parameters = [
    { tagsNumber : 1, testName : 'one tag'}, 
    { tagsNumber : 2, testName : 'two tags'},
    { tagsNumber : 5, testName : 'five tags'},
];

test.beforeEach( async({ page, user, articleWithoutTags }) => {
    await signUpUser(page, user);
    await createArticle(page, articleWithoutTags);
});

parameters.forEach(({ tagsNumber, testName}) => {
    test(`User is able to add ${testName} on edit to the previously created article`, async({ page, viewArticlePage })=> {
        await viewArticlePage.openEditArticlePage();
        const editArticlePage = new EditArticlePage(page);
        const tags = generateTagsArray(tagsNumber);
        await editArticlePage.addTagsToArticle(tags);
        await editArticlePage.updateArticle();
        //await page.reload();//
         await expect(async () => {
            await viewArticlePage.assertArticleTagsAreVisible(tags);
        }).toPass({
            timeout: 10000,
            intervals: [500, 1000, 2000]
        });
    });
});