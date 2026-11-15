import { expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function followArticleAuthor(page, itemName, username) {
  const homePage = new HomePage(page);
  const viewArticlePage = new ViewArticlePage(page);

  await homePage.clickGlobalFeedTab();
  await homePage.assertGlobalFeedTabIsActive();
  await homePage.clickArticleByTitle(itemName);
  await expect(page).toHaveURL(/article/);
  await viewArticlePage.clickFollowAuthorButton(username);
  await viewArticlePage.assertAuthorIsFollowed(username);
}
