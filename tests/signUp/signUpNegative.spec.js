import { test } from '../_fixtures/fixtures';
import {
  EMPTY_USERNAME_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

const user = generateNewUserData();

const parameters = [
  { 
    username: '',
    email : user.email,
    password : user.password,
    message : EMPTY_USERNAME_MESSAGE,
    testName : 'empty username',
  },
  { 
    username: user.username,
    email : '',
    password : user.password,
    message : INVALID_EMAIL_MESSAGE,
    testName : 'empty email', 
  },
  { 
    username: user.username,
    email : user.email,
    password : '',
    message : EMPTY_PASSWORD_MESSAGE,
    testName: 'empty password',
   }
];

parameters.forEach(({username, email, password, message, testName}) => {
  test.describe('Sign In negative tests', () => {
    test(`Sign In with ${testName}`, async({signUpPage}) => {
      await signUpPage.open();
      await signUpPage.fillUsernameField(username);
      await signUpPage.fillEmailField(email);
      await signUpPage.fillPasswordField(password);
      await signUpPage.clickSignUpButton();
      await signUpPage.assertErrorMessageContainsText(message);
    });
  })
})
