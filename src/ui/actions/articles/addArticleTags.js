import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { testStep } from '../../../common/pwHelpers/pw';

export async function addArticleTags(page, tags, userId = 0) {
  await testStep(
    `Add tags to Article: ${tags}`,
    async () => {
      const createArticlePage = new CreateArticlePage(page, userId);
      const viewArticlePage = new ViewArticlePage(page, userId);

      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.fillTagsField(tags);
      await createArticlePage.clickUpdateArticleButton();

      // smart spike to refresh content
      const articleUrl = viewArticlePage.url().replace('editor', 'article');
      await page.goto(articleUrl);

      return articleUrl;
    },
    userId,
  );
}
