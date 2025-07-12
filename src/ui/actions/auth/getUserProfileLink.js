
import { HomePage } from '../../pages/HomePage';
import { testStep } from '../../../common/pwHelpers/pw';

export async function getUserProfileLink(page, userId = 0) {
  await testStep(
    `Get url of user profile`,
    async () => {
        const homePage = new HomePage(page);
        await homePage.open()
        await homePage.clickProfileButton();
      
    },
    userId,
  );
  console.log(page.url());
  return page.url();
}
