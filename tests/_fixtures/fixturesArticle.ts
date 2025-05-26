import { test as base } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { Logger } from '../../src/common/logger/Logger';

export interface Article {
  title: string;
  description: string;
  text: string;
  tags: string[];
}

export const test = base.extend<{
  logger: Logger;
  articlesNumber: number;
  articlesWithoutTags: Article[];
  articleWithoutTags: Article;
  articleWithOneTag: Article;
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
}>({
  logger: async ({}, use) => {
    const logger = new Logger('info'); // Ensures it has all logging methods
    await use(logger);
  },
  articlesNumber: [1, { option: true }],
  articlesWithoutTags: async ({ logger, articlesNumber }, use) => {
    const articles: Article[] = [];
    for (let i = 0; i < articlesNumber; i++) {
      const article = generateNewArticleData(logger);
      articles.push(article);
    }

    await use(articles);
  },
  articleWithoutTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger);

    await use(article);
  },
  articleWithOneTag: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 1);

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
    const editArticlePage = new EditArticlePage(page);

    await use(editArticlePage);
  },
});
