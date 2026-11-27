import { faker } from '@faker-js/faker';
import { test } from '../_fixtures/fixtures';
import { INVALID_USERNAME_MESSAGE } from '../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

const testParameters = [
  {
    username: 'a',
    title: 'that is too short (1 character)',
  },
  {
    username: faker.string.alpha({ length: 41, casing: 'lower' }),
    title: 'that is too long (41 characters)',
    knownBug: 'Bug: the site registers a user with a 41-character username',
  },
  {
    username: '1username',
    title: 'starting with a digit',
  },
  {
    username: '_username',
    title: 'starting with an underscore',
  },
  {
    username: 'user name',
    title: 'containing a space',
  },
  {
    username: ' username',
    title: 'starting with a space',
  },
  {
    username: 'username ',
    title: 'ending with a space',
  },
];

test.describe('Sign up with invalid username', () => {
  testParameters.forEach(({ username, title, knownBug }) => {
    test(`Sign up with username ${title}`, async ({ signUpPage, homePage }) => {
      test.fail(!!knownBug, knownBug);

      const user = generateNewUserData();

      await signUpPage.open();
      await signUpPage.fillUsernameField(username);
      await signUpPage.fillEmailField(user.email);
      await signUpPage.fillPasswordField(user.password);
      await signUpPage.clickSignUpButton();

      await signUpPage.assertErrorMessageContainsText(INVALID_USERNAME_MESSAGE);
      await signUpPage.assertSignUpPageIsOpened();
      await homePage.assertYourFeedTabIsHidden();
    });
  });
});


