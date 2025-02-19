import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

test.use({ contextsNumber: 2, usersNumber: 2 });

test.beforeEach(async ({ pages, signUpUsers, articleWithoutTags }) => {
  await createArticle(pages[0], articleWithoutTags);
});

test('View an article created by another user', async ({
  articleWithoutTags,
  pages,
}) => {
  const viewArticlePage = new ViewArticlePage(pages[1]);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});
