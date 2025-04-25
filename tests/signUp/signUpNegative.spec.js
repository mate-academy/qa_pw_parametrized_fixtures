import {
  EMPTY_USERNAME_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';
import { test } from '../_fixtures/fixtures';

const testParameters = [
  {
    description: 'empty username',
    userData: { username: '', email: 'test@example.com', password: 'password123' },
    expectedError: EMPTY_USERNAME_MESSAGE,
  },
  {
    description: 'empty email',
    userData: { username: 'testuser', email: '', password: 'password123' },
    expectedError: INVALID_EMAIL_MESSAGE,
  },
  {
    description: 'empty password',
    userData: { username: 'testuser', email: 'test@example.com', password: '' },
    expectedError: EMPTY_PASSWORD_MESSAGE,
  },
];

testParameters.forEach(({ description, userData, expectedError }) => {
  test(`Sign up with ${description}`, async ({ signUpPage }) => {
    await signUpPage.open();

    await signUpPage.fillUsernameField(userData.username);
    await signUpPage.fillEmailField(userData.email);
    await signUpPage.fillPasswordField(userData.password);
    await signUpPage.clickSignUpButton();
    await signUpPage.assertErrorMessageContainsText(expectedError);
  });
});
