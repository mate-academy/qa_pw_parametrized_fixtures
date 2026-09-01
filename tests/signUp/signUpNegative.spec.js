import { test } from '../_fixtures/fixtures';
import {
  EMPTY_USERNAME_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

const newUser = generateNewUserData();
const testParams = [
  {
    username: '',
    email: newUser.email,
    password: newUser.password,
    errorMessage: EMPTY_USERNAME_MESSAGE,
  },
  {
    username: newUser.username,
    email: '',
    password: newUser.password,
    errorMessage: INVALID_EMAIL_MESSAGE,
  },
  {
    username: newUser.username,
    email: newUser.email,
    password: '',
    errorMessage: EMPTY_PASSWORD_MESSAGE,
  },
];

test.describe('Sign up negative tests', () => {
  test('Sign up with empty username', async ({ user, signUpPage }) => {
    await signUpPage.open();
    await signUpPage.fillEmailField(newUser.email);
    await signUpPage.fillPasswordField(newUser.password);
    await signUpPage.clickSignUpButton();

    await signUpPage.assertErrorMessageContainsText(EMPTY_USERNAME_MESSAGE);
  });

  test('Sign up with empty email', async ({ user, signUpPage }) => {
    await signUpPage.open();
    await signUpPage.fillUsernameField(newUser.username);
    await signUpPage.fillPasswordField(newUser.password);
    await signUpPage.clickSignUpButton();

    await signUpPage.assertErrorMessageContainsText(INVALID_EMAIL_MESSAGE);
  });

  test('Sign up with empty password', async ({ user, signUpPage }) => {
    await signUpPage.open();
    await signUpPage.fillUsernameField(newUser.username);
    await signUpPage.fillEmailField(newUser.email);
    await signUpPage.clickSignUpButton();

    await signUpPage.assertErrorMessageContainsText(EMPTY_PASSWORD_MESSAGE);
  });
});
