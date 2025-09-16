import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { test } from '@playwright/test';

export async function updateArticle(page, article) {
  const testLabel = article.tags.length
    ? 'Update a new Article with Required and Optional fields'
    : 'Update a new Article with Required fields';
  await test.step(testLabel, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const createArticlePage = new CreateArticlePage(page);

    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    await createArticlePage.fillTagsField(article.tags);
    await createArticlePage.clickUpdateArticleButton();
  });
}
