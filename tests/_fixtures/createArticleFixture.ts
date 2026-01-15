import { test as base } from '../_fixtures/fixtures';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

const test = base.extend<{
  tagNumber: number;
  createArticleWithYourTagNumber: ReturnType<typeof generateNewArticleData>;
}>({
  tagNumber: [0, { option: true }],
  createArticleWithYourTagNumber: async ({ tagNumber, page }, use) => {
    const articleData = generateNewArticleData(tagNumber);
    const userData = generateNewUserData();

    await signUpUser(page, userData);

    await createArticle(page, articleData);

    await use(articleData);
  },
});

export { test };
