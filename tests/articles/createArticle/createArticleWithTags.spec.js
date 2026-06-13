import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { faker } from '@faker-js/faker';

const testParameters = [
    { tagsNumber: 1, testNameEnding: 'one tag' },
    { tagsNumber: 2, testNameEnding: 'two tags' },
    { tagsNumber: 5, testNameEnding: 'five tags' },
];

test.describe('Articles Tags Management', () => {
    test.beforeEach(async ({ page, user }) => {
        await signUpUser(page, user);
    });

    test.describe('Create article with tags', () => {
        testParameters.forEach(({ tagsNumber, testNameEnding }) => {
            test(`Create an article with ${testNameEnding}`, async ({
                homePage,
                createArticlePage,
                viewArticlePage,
                logger,
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
            });
        });
    });

    test.describe('Delete tags from created article', () => {
        testParameters.forEach(({ tagsNumber, testNameEnding }) => {
            test(`Delete ${testNameEnding} from created article`, async ({
                page,
                viewArticlePage,
                editArticlePage,
                logger,
            }) => {
                const articleData = generateNewArticleData(logger, tagsNumber);
                const createdArticle = await createArticle(page, articleData);

                await viewArticlePage.open(createdArticle.url);
                await viewArticlePage.clickEditArticle();
                await editArticlePage.removeTags(createdArticle.tags);
                await editArticlePage.clickUpdateArticleButton();
                await viewArticlePage.assertArticleTagsAreNotVisible(createdArticle.tags);
            });
        });
    });

    test.describe('Modify tags in created article', () => {
        testParameters.forEach(({ tagsNumber, testNameEnding }) => {
            test(`Add ${testNameEnding} to created article`, async ({
                page,
                viewArticlePage,
                editArticlePage,
                logger,
            }) => {
                const articleData = generateNewArticleData(logger);
                const createdArticle = await createArticle(page, articleData);

                await viewArticlePage.clickEditArticle();

                const tags = Array.from({ length: tagsNumber }, () => faker.lorem.word());
                await editArticlePage.fillTagsField(tags);

                await editArticlePage.clickUpdateArticleButton();

                await viewArticlePage.assertArticleTitleIsVisible(createdArticle.title);
                await viewArticlePage.assertArticleTagsAreVisible(tags);
            });
        });
    });
});
