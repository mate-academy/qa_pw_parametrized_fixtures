import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

export const test = base.extend<{
  signUpUsers;
  signUpPage;
  signInPage;
  homePage;
  editArticlePage;
}>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },

  editArticlePage: async ({ page }, use) => {
    const editArticlePage = new EditArticlePage(page);
    await use(editArticlePage);
  },

  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },
});
