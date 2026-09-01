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
    message: EMPTY_USERNAME_MESSAGE,
    title: 'empty username',
  },
  {
    username: newUser.username,
    email: '',
    password: newUser.password,
    message: INVALID_EMAIL_MESSAGE,
    title: 'empty email',
  },
  {
    username: newUser.username,
    email: newUser.email,
    password: '',
    message: EMPTY_PASSWORD_MESSAGE,
    title: 'empty password',
  },
];

testParams.forEach(({ username, email, password, message, title }) => {
  test.describe('Sign up negative tests', () => {
    test(`Sign up with ${title}`, async ({ signUpPage }) => {
      await signUpPage.open();
      await signUpPage.fillUsernameField(username);
      await signUpPage.fillEmailField(email);
      await signUpPage.fillPasswordField(password);
      await signUpPage.clickSignUpButton();

      await signUpPage.assertErrorMessageContainsText(message);
    });
  });
});
