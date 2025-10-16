import { test } from '../_fixtures/fixtures';
import {
  EMPTY_PASSWORD_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  EMPTY_USERNAME_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

const user = generateNewUserData();
const testParameters = [
  {
    username: user.username,
    email: user.email,
    password: '',
    message: EMPTY_PASSWORD_MESSAGE,
    title: 'empty password',
  },
  {
    username: user.username,
    email: '',
    password: user.password,
    message: INVALID_EMAIL_MESSAGE,
    title: 'empty email',
  },
  {
    username: '',
    email: user.email,
    password: user.password,
    message: EMPTY_USERNAME_MESSAGE,
    title: 'wrong password',
  },
];

testParameters.forEach(({ email, password, message, title }) => {
  test.describe('Sign up negative tests', () => {
    test(`Sign up with ${title}`, async ({ signUpPage }) => {
      await signUpPage.open();
      await signUpPage.fillEmailField(email);
      await signUpPage.fillPasswordField(password);
      await signUpPage.clickSignUpButton();
      await signUpPage.assertErrorMessageContainsText(message);
    });
  });
});
