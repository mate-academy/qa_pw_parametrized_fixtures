import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 3, usersNumber: 3, articlesNumber: 2 });

test.beforeEach(async ({ pages, users, articlesWithoutTags }) => {
    await signUpUser(pages[0], users[0], 1);
    await signUpUser(pages[1], users[1], 2);
    await signUpUser(pages[2], users[2], 3);
    articlesWithoutTags[0] = await createArticle(pages[0], articlesWithoutTags[0], 1);
    articlesWithoutTags[1] = await createArticle(pages[1], articlesWithoutTags[1], 2);
});

test('View an article created by another user', async ({ articlesWithoutTags, pages, users }) => {
    await checkCreatedArticle(articlesWithoutTags[0], users[0], pages[2]);
});

test('View an articles created by two other users', async ({ articlesWithoutTags, pages, users }) => {
    await checkCreatedArticle(articlesWithoutTags[0], users[0], pages[2]);
    await checkCreatedArticle(articlesWithoutTags[1], users[1], pages[2]);
});

async function checkCreatedArticle(article, user, page) {
    const viewArticlePage = new ViewArticlePage(page);

    await viewArticlePage.open(article.url);

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
    await viewArticlePage.assertArticleAuthorNameIsVisible(user.username);
}
