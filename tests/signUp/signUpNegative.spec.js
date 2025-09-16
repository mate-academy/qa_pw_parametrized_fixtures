import { test } from '../_fixtures/fixtures';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import {
  EMPTY_USERNAME_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';

const user = generateNewUserData();
const testParameters = [
  {
    username: '',
    email: user.email,
    password: user.password,
    errorMessage: EMPTY_USERNAME_MESSAGE,
    testTitle: 'without username',
  },
  {
    username: user.username,
    email: '',
    password: user.password,
    errorMessage: INVALID_EMAIL_MESSAGE,
    testTitle: 'without email',
  },
  {
    username: user.username,
    email: user.email,
    password: '',
    errorMessage: EMPTY_PASSWORD_MESSAGE,
    testTitle: 'without password',
  },
];

test.describe('Sign up negative tests', () => {
  testParameters.forEach(
    ({ username, email, password, errorMessage, testTitle }) => {
      test(`Sign up ${testTitle}`, async ({ signUpPage }) => {
        await signUpPage.open();
        await signUpPage.fillUsernameField(username);
        await signUpPage.fillEmailField(email);
        await signUpPage.fillPasswordField(password);
        await signUpPage.clickSignUpButton();
        await signUpPage.assertErrorMessageContainsText(errorMessage);
      });
    },
  );
});
