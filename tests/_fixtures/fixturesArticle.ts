import { test as base } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

export const test = base.extend<{
    articleWithoutTags;
    articleWithOneTag;
    articleWithManyTags;
    createArticlePage;
    viewArticlePage;
    tagsNum;
    editArticlePage;
    articlesNumber;
    articlesWithoutTags;
}>({
    articlesNumber: [0, {option: true}],
    tagsNum: [0, {option: true}],

    articlesWithoutTags: async ({ logger, articlesNumber }, use) => {
        let articles = Array(articlesNumber)

        for (let i = 0; i < articlesNumber; i++) {
            articles[i] = generateNewArticleData(logger)
        }

        use(articles)
    },
    articleWithoutTags: async ({ logger }, use) => {
        const article = generateNewArticleData(logger);

        await use(article);
    },
    articleWithOneTag: async ({ logger }, use) => {
        const article = generateNewArticleData(logger, 1);

        await use(article);
    },
    articleWithManyTags: async ({ logger, tagsNum }, use) => {
        const article = generateNewArticleData(logger, tagsNum);

        await use(article);
    },
    createArticlePage: async ({ page }, use) => {
        const createArticlePage = new CreateArticlePage(page);

        await use(createArticlePage);
    },
    viewArticlePage: async ({ page }, use) => {
        const viewArticlePage = new ViewArticlePage(page);

        await use(viewArticlePage);
    },
    editArticlePage: async ({ page }, use) => {
        const editArticlePage = new EditArticlePage(page)

        await use(editArticlePage);
    }
});
