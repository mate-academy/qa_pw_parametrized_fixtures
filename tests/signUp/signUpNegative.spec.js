import { test } from '../_fixtures/fixtures';
import {
  EMPTY_USERNAME_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';


const testParameters = [
  {
    username: '',
    email: true,
    password: true,
    message: EMPTY_USERNAME_MESSAGE,
    title: 'empty username',
  },
  {
    username: true,
    email: '',
    password: true,
    message: INVALID_EMAIL_MESSAGE,
    title: 'empty email',
  },
  {
    username: true,
    email: true,
    password: '',
    message: EMPTY_PASSWORD_MESSAGE,
    title: 'empty password',
  },
];

testParameters.forEach(({ username, email, password, message, title }) => {
  test.describe('Sign up negative tests', () => {
    test(`Sign up with ${title}`, async ({ user, signUpPage }) => {
      await signUpPage.open();

      if (username !== '') await signUpPage.fillUsernameField(user.username);
      if (email !== '') await signUpPage.fillEmailField(user.email);
      if (password !== '') await signUpPage.fillPasswordField(user.password);

      await signUpPage.clickSignUpButton();
      await signUpPage.assertErrorMessageContainsText(message);
    });
  });
});
// test.describe('Sign up negative tests', () => {
//   test('Sign up with empty username', async ({ user, signUpPage }) => {
//     await signUpPage.open();
//     await signUpPage.fillEmailField(user.email);
//     await signUpPage.fillPasswordField(user.password);
//     await signUpPage.clickSignUpButton();

//     await signUpPage.assertErrorMessageContainsText(EMPTY_USERNAME_MESSAGE);
//   });

//   test('Sign up with empty email', async ({ user, signUpPage }) => {
//     await signUpPage.open();
//     await signUpPage.fillUsernameField(user.username);
//     await signUpPage.fillPasswordField(user.password);
//     await signUpPage.clickSignUpButton();

//     await signUpPage.assertErrorMessageContainsText(INVALID_EMAIL_MESSAGE);
//   });

//   test('Sign up with empty password', async ({ user, signUpPage }) => {
//     await signUpPage.open();
//     await signUpPage.fillUsernameField(user.username);
//     await signUpPage.fillEmailField(user.email);
//     await signUpPage.clickSignUpButton();

//     await signUpPage.assertErrorMessageContainsText(EMPTY_PASSWORD_MESSAGE);
//   });
// });
