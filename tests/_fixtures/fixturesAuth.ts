import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

export const test = base.extend<{
  signUpUsers;
  signUpPage;
  signInPage;
  homePage;
}>({
  signUpUsers: async ({ pages, users, usersNumber }, use) => {
    for (let i = 0; i < usersNumber; i++) {
      await signUpUser(pages[i], users[i]);
    }

    await use('signUpUsers');
  },
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
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
