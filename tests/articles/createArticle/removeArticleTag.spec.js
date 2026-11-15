import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

test.describe('Remove article tags', () => {
  test.beforeEach(async ({ page, user }) => {
    await signUpUser(page, user);
  });

  testParameters.forEach(({ tagsNumber, testNameEnding }) => {
    test(`Remove ${testNameEnding} 
      tags from previously created article`, async ({
      viewArticlePage,
      editArticlePage,
      logger,
      page,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);
      await createArticle(page, article);
      await viewArticlePage.open(article.url);
      await viewArticlePage.clickEditArticleButton();
      for (const t of article.tags) {
        await editArticlePage.clickRemoveTagButton(t);
      }
      await editArticlePage.clickUpdateArticleButton();
      await expect(page).toHaveURL(/article/);
      await page.reload();
      await viewArticlePage.assertArticleTagsAreNotVisible(article.tags);
    });
  });
});
