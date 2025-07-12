import { test } from '../_fixtures/fixtures';
import {
  EMPTY_USERNAME_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';


const user = generateNewUserData();
const negativeTestParameters = [
  {
    userName: '',
    email: user.email,
    password: user.password,
    errorMessage: EMPTY_USERNAME_MESSAGE,
    testTitle: 'empty username',
  },
  {
    userName: user.username,
    email: '',
    password: user.password,
    errorMessage: INVALID_EMAIL_MESSAGE,
    testTitle: 'empty email',
  },
  {
    userName: user.username,
    email: user.email,
    password: '',
    errorMessage: EMPTY_PASSWORD_MESSAGE,
    testTitle: 'empty password',
  },
];

negativeTestParameters.forEach(({
  userName, email, password, errorMessage, testTitle }) => {

  test.describe('Sign Up negative tests', () => {
    test(`Sign up with ${testTitle}`, async ({ signUpPage }) => {
      await signUpPage.open();
      await signUpPage.fillUsernameField(userName);
      await signUpPage.fillEmailField(email);
      await signUpPage.fillPasswordField(password);
      await signUpPage.clickSignUpButton();
      await signUpPage.assertErrorMessageContainsText(errorMessage);

    });

  });

});
