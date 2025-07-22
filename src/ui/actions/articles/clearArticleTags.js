import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { testStep } from '../../../common/pwHelpers/pw';

export async function clearArticleTags(page, tags, userId = 0) {
  await testStep(
    `Clear Article tags`,
    async () => {
      const createArticlePage = new CreateArticlePage(page, userId);
      const viewArticlePage = new ViewArticlePage(page, userId);

      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.clearTagsField(tags);
      await createArticlePage.clickUpdateArticleButton();

      // smart spike to refresh content
      const articleUrl = viewArticlePage.url().replace('editor', 'article');
      await page.goto(articleUrl);

      return articleUrl;
    },
    userId,
  );
}
