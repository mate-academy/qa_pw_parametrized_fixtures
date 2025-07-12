import { SignUpPage } from '../../pages/auth/SignUpPage';
import { HomePage } from '../../pages/HomePage';
import { testStep } from '../../../common/pwHelpers/pw';

export async function signUpUser(page, user, userId = 0) {
  await testStep(
    `Sign up user`,
    async () => {
      const signUpPage = new SignUpPage(page, userId);
      const homePage = new HomePage(page, userId);

      await signUpPage.open();
      await signUpPage.submitSignUpForm(user);

      await homePage.assertYourFeedTabIsVisible();
    },
    userId,
  );

}
