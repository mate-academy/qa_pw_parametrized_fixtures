import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { generateNewArticleData } from
  '../../../src/common/testData/generateNewArticleData';

test.use({ contextsNumber: 3, usersNumber: 3 });

let articlesByUser;

/** Sign up 3 users and create one article per user (no tags). */
test.beforeEach(async ({ pages, users, logger }) => {
  for (let i = 0; i < 3; i++) {
    await signUpUser(pages[i], users[i], i + 1);
  }

  articlesByUser = [];
  for (let i = 0; i < 3; i++) {
    const article = generateNewArticleData(logger, 0);
    await createArticle(pages[i], article, i + 1);
    articlesByUser[i] = article; // createArticle should set article.url
  }
});

/** Iterate viewers: user1, user2, user3 */
[0, 1, 2].forEach((viewerIdx) => {
  test(
    `Viewer (user${viewerIdx + 1}) can open articles from the other two users`,
    async ({ pages, users }) => {
      const viewPage = new ViewArticlePage(pages[viewerIdx], viewerIdx + 1);

      // The two authors are the two users that are not the viewer
      const authorIdxs = [0, 1, 2].filter((i) => i !== viewerIdx);

      for (const authorIdx of authorIdxs) {
        const article = articlesByUser[authorIdx];

        await viewPage.open(article.url);
        await viewPage.assertArticleTitleIsVisible(article.title);
        await viewPage.assertArticleTextIsVisible(article.text);
        await viewPage.assertArticleAuthorNameIsVisible(
          users[authorIdx].username
        );
      }
    }
  );
});