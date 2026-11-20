import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';


test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(async({pages, users}) => {
    await signUpUser(pages[0], users[0], 1);
    await signUpUser(pages[1], users[1], 2);
    await signUpUser(pages[2], users[2], 3);
});

test(`User can see in your feeds articles from two different users`, async({pages, users, logger}) => {
    const article1 = generateNewArticleData(logger);
    const article2 = generateNewArticleData(logger);
    await createArticle(pages[0], article1, 1);
    await createArticle(pages[1], article2, 2);
    const homePage = new HomePage(pages[2]);
    await homePage.openGlobalFeed();
    await homePage.assertArticleTitleIsVisible(article1.title);
    await homePage.assertArticleAuthorNameIsVisible(article1.title, users[0].username);
    await homePage.assertArticleTitleIsVisible(article2.title);
    await homePage.assertArticleAuthorNameIsVisible(article2.title, users[1].username);
});