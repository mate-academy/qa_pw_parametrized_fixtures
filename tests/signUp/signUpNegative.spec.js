import { test } from '../_fixtures/fixtures';
import {
  EMPTY_USERNAME_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

const user = generateNewUserData();
const testParameters = [
  {
    userName: '',
    email: user.email,
    password: user.password,
    message: EMPTY_USERNAME_MESSAGE,
    title: 'empty user name',
  },
  {
    userName: user.username,
    email: '',
    password: user.password,
    message: INVALID_EMAIL_MESSAGE,
    title: 'empty email',
  },
  {
    userName: user.username,
    email: user.email,
    password: '',
    message: EMPTY_PASSWORD_MESSAGE,
    title: 'empty password',
  },
];

testParameters.forEach(({ userName, email, password, message, title }) => {
  test.describe('Sign up negative tests', () => {
    test(`Sign up with ${title}`, async ({ signUpPage }) => {
      await signUpPage.open();
      await signUpPage.fillUsernameField(userName);
      await signUpPage.fillEmailField(email);
      await signUpPage.fillPasswordField(password);
      await signUpPage.clickSignUpButton();
      await signUpPage.assertErrorMessageContainsText(message);
    });
  });
});
