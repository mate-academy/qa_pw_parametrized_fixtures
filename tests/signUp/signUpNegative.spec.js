import { test } from '../_fixtures/fixtures';
import {
  EMPTY_USERNAME_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE, 
} from '../../src/ui/constants/authErrorMessages';
import { faker } from "@faker-js/faker";

test.describe('Sign up negative tests', () => {
  const testParameters = [
    {
      empty: 'username',
      message: EMPTY_USERNAME_MESSAGE,
      title: 'empty username',
    },
    {
      empty: 'email',
      message: INVALID_EMAIL_MESSAGE,
      title: 'invalid email',
    },
    {
      empty: 'password',
      message: EMPTY_PASSWORD_MESSAGE,
      title: 'empty password',
    },
  ];
  
  testParameters.forEach(({ empty, message, title }) => {
    test(`Sign up with ${title}`, async ({user, signUpPage }) => {
      await signUpPage.open();
      if (empty !== "username") {
        await signUpPage.fillUsernameField(user.username);
      }
      if (empty !== "email") {
        await signUpPage.fillEmailField(user.email);
      }
      if (empty !== "password") {
        await signUpPage.fillPasswordField(user.password);
      }
      
      await signUpPage.clickSignUpButton();
      await signUpPage.assertErrorMessageContainsText(message);
    });
  });
});
