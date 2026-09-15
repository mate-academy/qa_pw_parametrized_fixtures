import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

export const test = base.extend<{
  signUpPage: SignUpPage;
  signInPage: SignInPage;
  homePage: HomePage;
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
}>({
  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  createArticlePage: async ({ page }, use) => {
    await use(new CreateArticlePage(page));
  },
  viewArticlePage: async ({ page }, use) => {
    await use(new ViewArticlePage(page));
  },
  editArticlePage: async ({ page }, use) => {
    await use(new EditArticlePage(page));
  },
});
