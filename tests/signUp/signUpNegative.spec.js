import { test } from '../_fixtures/fixtures';
import {
    EMPTY_USERNAME_MESSAGE,
    INVALID_EMAIL_MESSAGE,
    EMPTY_PASSWORD_MESSAGE,
    EMPTY_EMAIL_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';

const params = [
    {
        testName: 'Sign up with empty username',
        username: '',
        email: 'validEmail@example.com',
        password: '123somePass321',
        errorMessage: EMPTY_USERNAME_MESSAGE,
    },
    {
        testName: 'Sign up with invalid email',
        username: 'validName',
        email: ' ',
        password: '123somePass321',
        errorMessage: INVALID_EMAIL_MESSAGE,
    },
    {
        testName: 'Sign up with empty email',
        username: 'validName',
        email: '',
        password: '123somePass321',
        errorMessage: EMPTY_EMAIL_MESSAGE,
    },
    {
        testName: 'Sign up with empty password',
        username: 'validName',
        email: 'validEmail@example.com',
        password: '',
        errorMessage: EMPTY_PASSWORD_MESSAGE,
    },
];

test.describe('Sign up negative tests', () => {
    params.forEach(({ testName, username, email, password, errorMessage }) => {
        test(testName, async ({ signUpPage }) => {
            await signUpPage.open();
            await signUpPage.fillUsernameField(username);
            if (email) {
                await signUpPage.fillEmailField(email);
            }
            await signUpPage.fillPasswordField(password);
            await signUpPage.clickSignUpButton();

            await signUpPage.assertErrorMessageContainsText(errorMessage);
        });
    });
});
