import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

test.use({ contextsNumber: 3, usersNumber: 3 });

// User can see in your feeds articles from two different users

test.beforeEach(
  async ({ users, pages, articleWithoutTags, articleWithOneTag }) => {
    await signUpUser(pages[0], users[0], 1);
    await signUpUser(pages[1], users[1], 2);
    await signUpUser(pages[2], users[2], 3);

    await createArticle(pages[1], articleWithoutTags, 2);
    await createArticle(pages[2], articleWithOneTag, 3);

    const viewArticlePage = new ViewArticlePage(pages[0]);
    await viewArticlePage.open(articleWithoutTags.url);
    await viewArticlePage.clickFollowButton();
    await viewArticlePage.open(articleWithOneTag.url);
    await viewArticlePage.clickFollowButton();
  },
);

test(`View articles in 'Your Feed' tab from two different users`, async ({
  users,
  pages,
  articleWithoutTags,
  articleWithOneTag,
}) => {
  const homePage = new HomePage(pages[0]);

  await homePage.open();

  await homePage.assertArticleAuthorNameIsVisible(users[1].username);
  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleDescriptionIsVisible(
    articleWithoutTags.description,
  );

  await homePage.assertArticleAuthorNameIsVisible(users[2].username);
  await homePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await homePage.assertArticleDescriptionIsVisible(
    articleWithOneTag.description,
  );
});
