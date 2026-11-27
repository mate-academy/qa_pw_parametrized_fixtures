import { faker } from '@faker-js/faker';
import { test } from '../_fixtures/fixtures';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

const testParameters = [
  {
    username: faker.string.alpha({ length: 40, casing: 'lower' }),
    title: 'of maximum length (40 characters)',
  },
  {
    username: `${faker.string.alpha({ length: 10, casing: 'lower' })}123`,
    title: 'containing digits after the first letter',
  },
];

test.describe('Sign up with valid username', () => {
  testParameters.forEach(({ username, title }) => {
    test(`Sign up with username ${title}`, async ({ signUpPage, homePage }) => {
      const user = generateNewUserData();

      await signUpPage.open();
      await signUpPage.fillUsernameField(username);
      await signUpPage.fillEmailField(user.email);
      await signUpPage.fillPasswordField(user.password);
      await signUpPage.clickSignUpButton();

      await homePage.assertYourFeedTabIsVisible();
    });
  });
});
