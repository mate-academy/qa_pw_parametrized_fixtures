import { test } from '../_fixtures/fixtures';
import {
  EMPTY_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
  EMPTY_USERNAME_MESSAGE, INVALID_EMAIL_MESSAGE,
  INVALID_EMAIL_OR_PASSWORD_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';

const testParameters = [
  {
    email: 'test@email.com',
    password: '',
    message: EMPTY_PASSWORD_MESSAGE,
    username: 'correctUsername',
    title: 'Empty password',
  },
  {
    email: '',
    password: '1',
    message: INVALID_EMAIL_MESSAGE,
    username: 'correctUsername',
    title: 'invalid email or password'
  },
  {
    email: 'test@email.com',
    password: '1',
    message: EMPTY_USERNAME_MESSAGE,
    username: '',
    title: 'empty username'
  }
];


testParameters.forEach(({username, password, email,
                          message, title}) => {
  test.describe('' + title, () => {
    test("Sign up with different email address", async ({
                                                          signUpPage }) => {
      await signUpPage.open();
      await signUpPage.fillUsernameField(username);
      await signUpPage.fillEmailField(email);
      await signUpPage.fillPasswordField(password);
      await signUpPage.clickSignUpButton();

      await signUpPage.assertErrorMessageContainsText(message);
    })
  });
})