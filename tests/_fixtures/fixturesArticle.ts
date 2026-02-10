import { test as base } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

export const test = base.extend<{
  articleWithoutTags: any;
  articleWithOneTag: any;
  newArticleWithoutTags: any;
  newArticleWithOneTag: any;
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
}>({
  articleWithoutTags: async ({ logger }, use) => {
    await use(generateNewArticleData(logger, 0));
  },
  articleWithOneTag: async ({ logger }, use) => {
    await use(generateNewArticleData(logger, 1));
  },
  newArticleWithoutTags: async ({ logger }, use) => {
    await use(generateNewArticleData(logger, 0));
  },
  newArticleWithOneTag: async ({ logger }, use) => {
    await use(generateNewArticleData(logger, 1));
  },

  createArticlePage: async ({ page }, use) => {
    await use(new CreateArticlePage(page));
  },
  viewArticlePage: async ({ page }, use) => {
    await use(new ViewArticlePage(page));
  },
  editArticlePage: async ({ page }, use) => {
    await use(new EditArticlePage(page));
  },
});

