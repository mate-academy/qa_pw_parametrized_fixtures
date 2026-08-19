import { EditArticlePage } from '../../pages/article/EditArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { testStep } from '../../../common/pwHelpers/pw';

export async function editArticle(page, article, userId = 0) {
  article['url'] = await testStep(
    `Edit an article`,
    async () => {
      const editArticlePage = new EditArticlePage(page, userId);
      const viewArticlePage = new ViewArticlePage(page, userId);

      await viewArticlePage.open(article.url);
      await viewArticlePage.clickEditArticleButton();
      await editArticlePage.submitEditArticleForm(article);
      await viewArticlePage.assertArticleTitleIsVisible(article.title);

      return viewArticlePage.url();
    },
    userId,
  );

  return article;
}
