import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

test.describe('Add article tags', () => {
  test.beforeEach(async ({ page, user }) => {
    await signUpUser(page, user);
  });

  testParameters.forEach(({ tagsNumber, testNameEnding }) => {
    test(`Add ${testNameEnding} 
      tags from previously created article`, async ({
      viewArticlePage,
      editArticlePage,
      logger,
      page,
      articleWithoutTags,
      createArticlePage,
    }) => {
      const tags = generateNewArticleData(logger, tagsNumber).tags;
      await createArticle(page, articleWithoutTags);
      await viewArticlePage.open(articleWithoutTags.url);
      await viewArticlePage.clickEditArticleButton();

      await createArticlePage.fillTagsField(tags);

      await editArticlePage.clickUpdateArticleButton();
      await expect(page).toHaveURL(/article/);
      await page.reload();
      await viewArticlePage.assertArticleTagsAreVisible(tags);
    });
  });
});
