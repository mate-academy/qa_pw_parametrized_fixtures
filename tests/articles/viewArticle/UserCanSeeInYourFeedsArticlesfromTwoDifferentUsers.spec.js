import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.use({ contextsNumber: 3, usersNumber: 3 });

test.beforeEach(async ({ 
  pages, 
  users, 
  articleWithoutTags, 
  articleWithOneTag, 
}) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);
  await createArticle(pages[0], articleWithoutTags, 1);
  await createArticle(pages[1], articleWithOneTag, 2);
});

test('User can see in your feeds articles from two different users', async ({
  articleWithoutTags,
  articleWithOneTag,
  pages,
  users,
  articleWithoutTags1,
  articleWithoutTags2,
  
}) => {
  const viewArticlePage = new ViewArticlePage(pages[2], 3);
  const homePage = new HomePage(pages[2], 3);
  


  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(users[0].username);

  await viewArticlePage.followUserLinkClick(users[0].username);
  await viewArticlePage.unFollowUserLinkToBeVisible(users[0].username);


  await viewArticlePage.open(articleWithOneTag.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(users[1].username);

  await viewArticlePage.followUserLinkClick(users[1].username);
  await viewArticlePage.unFollowUserLinkToBeVisible(users[1].username);

  
  await createArticle(pages[0], articleWithoutTags1, 1);
  await createArticle(pages[1], articleWithoutTags2, 2);

  await viewArticlePage.openHomeUrll();
  await homePage.yourFeedTab.click();
  await homePage.assertTitleAtGlobalFeedIsVisible(articleWithoutTags1.title);
  await homePage.assertDescriptionAtGlobalFeedIsVisible(
    articleWithoutTags1.title,
    articleWithoutTags1.description
  );
  await homePage.assertArticleAuthorAtGlobalFeedIsVisible(
    articleWithoutTags1.title,
    users[0].username
  );

   await homePage.assertTitleAtGlobalFeedIsVisible(articleWithoutTags2.title);
  await homePage.assertDescriptionAtGlobalFeedIsVisible(
    articleWithoutTags2.title,
    articleWithoutTags2.description
  );
  await homePage.assertArticleAuthorAtGlobalFeedIsVisible(
    articleWithoutTags2.title,
    users[1].username
  );
});
