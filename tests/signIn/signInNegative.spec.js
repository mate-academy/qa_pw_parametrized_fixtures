import { test } from '../_fixtures/fixtures';
import {
  EMPTY_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
  INVALID_EMAIL_OR_PASSWORD_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';

test.describe('Sign in negative tests', () => {
  test('Sign in with empty password', async ({ user, signInPage }) => {
    await signInPage.open();
    await signInPage.fillEmailField(user.email);
    await signInPage.clickSignInButton();
    await signInPage.assertErrorMessageContainsText(EMPTY_PASSWORD_MESSAGE);
  });

  test('Sign in with empty email', async ({ user, signInPage }) => {
    await signInPage.open();
    await signInPage.fillPasswordField(user.password);
    await signInPage.clickSignInButton();
    await signInPage.assertErrorMessageContainsText(EMPTY_EMAIL_MESSAGE);
  });

  test('Sign in with wrong password', async ({ user, signInPage }) => {
    await signInPage.open();
    await signInPage.fillEmailField(user.email);
    await signInPage.fillPasswordField('1');
    await signInPage.clickSignInButton();
    await signInPage.assertErrorMessageContainsText(
      INVALID_EMAIL_OR_PASSWORD_MESSAGE,
    );
  });
});
