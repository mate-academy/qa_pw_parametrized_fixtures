import { test } from '../../_fixtures/fixturesArticle';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(async ({ 
  pages, 
  users, 
  articleWithoutTags, 
  articleWith1Tag }) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);

  await createArticle(pages[0], articleWithoutTags, 1);
  await createArticle(pages[1], articleWith1Tag, 2);
});

test('User can see in your feeds articles from two different users', async ({
  pages,
  users,
  articleWithoutTags,
  articleWith1Tag,
}) => {
  const viewArticlePage = new ViewArticlePage(pages[2], 3);
  const homePage = new HomePage(pages[2], 3);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.followUserLinkClick(users[0].username);
  await viewArticlePage.unFollowUserLinkToBeVisible(users[0].username);

  await viewArticlePage.open(articleWith1Tag.url);
  await viewArticlePage.followUserLinkClick(users[1].username);
  await viewArticlePage.unFollowUserLinkToBeVisible(users[1].username);

  await pages[2].goto('/');
  await homePage.yourFeedTab.click();

  await homePage.assertTitleAtGlobalFeedIsVisible(articleWithoutTags.title);
  await homePage.assertArticleAuthorAtGlobalFeedIsVisible(
    articleWithoutTags.title,
    users[0].username
  );

  await homePage.assertTitleAtGlobalFeedIsVisible(articleWith1Tag.title);
  await homePage.assertArticleAuthorAtGlobalFeedIsVisible(
    articleWith1Tag.title,
    users[1].username
  );
});
