import { test } from '../_fixtures/fixtures';
import {
  EMPTY_USERNAME_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';

import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

const testParameters = [
  {
    message: EMPTY_USERNAME_MESSAGE,
    title: 'empty username',
    fieldToEmpty: 'username',
  },
  {
    message: INVALID_EMAIL_MESSAGE,
    title: 'empty email',
    fieldToEmpty: 'email',
  },
  {
    message: EMPTY_PASSWORD_MESSAGE,
    title: 'empty password',
    fieldToEmpty: 'password',
  },
];

testParameters.forEach(({ message, title, fieldToEmpty }) => {
  test.describe('Sign up negative tests', () => {
    test(`Sign up with ${title}`, async ({ signUpPage }) => {
      const user = generateNewUserData();

      const payload = {
        username: fieldToEmpty === 'username' ? '' : user.username,
        email: fieldToEmpty === 'email' ? '' : user.email,
        password: fieldToEmpty === 'password' ? '' : user.password,
      };

      await signUpPage.open();
      await signUpPage.fillUsernameField(payload.username);
      await signUpPage.fillEmailField(payload.email);
      await signUpPage.fillPasswordField(payload.password);
      await signUpPage.clickSignUpButton();

      await signUpPage.assertErrorMessageContainsText(message);
    });
  });
});
