import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);
  await createArticle(pages[0], articleWithoutTags, 1);
});

test('User can see in your feeds articles from two different users', async ({
  articleWithoutTags,
  pages,
  users,
}) => {
  const viewArticlePage2 = new ViewArticlePage(pages[1], 2);
  const viewArticlePage3 = new ViewArticlePage(pages[2], 3);

  await viewArticlePage2.open(articleWithoutTags.url);

  await viewArticlePage2.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage2.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage2.assertArticleAuthorNameIsVisible(users[0].username);

  await viewArticlePage3.open(articleWithoutTags.url);

  await viewArticlePage3.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage3.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage3.assertArticleAuthorNameIsVisible(users[0].username);
});
