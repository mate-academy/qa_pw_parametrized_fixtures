import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { followUser } from '../../../src/ui/actions/profiles/followUser';

test.use({ contextsNumber: 3, usersNumber: 3 });

test('View in your feeds articles from two different users.', async ({
  pages,
  users,
  articleWithoutTags, 
  articleWithOneTag
}) => {
  const article1 = articleWithoutTags;
  const article2 = articleWithOneTag;
  const homePage = new HomePage (pages[2], 3);

  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);
  await followUser(pages[2], 3, users[0].username);
  await followUser(pages[2], 3, users[1].username);
  await createArticle(pages[0], articleWithoutTags, 1);
  await createArticle(pages[1], articleWithOneTag, 2);
  
  await homePage.goToHomePage();
  await homePage.assertArticleTitleIsVisible(article1.title);
  await homePage.assertArticleDescriptionIsVisible(
    article1.description
  );
  await homePage.assertArticleAuthorNameIsVisible(users[0].username);
  await homePage.assertArticleTitleIsVisible(article2.title);
  await homePage.assertArticleDescriptionIsVisible(
    article2.description
  );
  await homePage.assertArticleAuthorNameIsVisible(users[1].username);
});
