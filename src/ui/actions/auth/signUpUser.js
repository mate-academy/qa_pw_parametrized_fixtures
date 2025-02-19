import { SignUpPage } from '../../pages/auth/SignUpPage';
import { HomePage } from '../../pages/HomePage';
import { test } from '@playwright/test';

export async function signUpUser(page, user) {
  await test.step(`Sign up user`, async () => {
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);

    await signUpPage.open();
    await signUpPage.submitSignUpForm(user);

    await homePage.assertYourFeedTabIsVisible();
  });
}
