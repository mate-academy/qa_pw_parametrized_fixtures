import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { getUserProfileLink } from '../../../src/ui/actions/auth/getUserProfileLink';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { UserProfilePage } from '../../../src/ui/pages/UserProfilePage';


test.use({ contextsNumber: 3, usersNumber: 3 });

let articleUser2;
let articleUser3;

test.beforeEach(async ({ pages, users, articleWithoutTags}) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);
  
  articleUser2 = await createArticle(pages[1], articleWithoutTags, 2);
  articleUser3 = await createArticle(pages[2], articleWithoutTags, 3);
});

test(
  'User can see in your feeds articles from two different users', 
  async ({ pages }) => {

    const userProfileLink1 = await getUserProfileLink(pages[1], 2);
    const userProfileLink2 =  await getUserProfileLink(pages[2], 3);
    
    const userProfilePage = new UserProfilePage(pages[0], 1);
    await userProfilePage.openUserProfilePage(userProfileLink1);
    await userProfilePage.clickFollowButton();
    await userProfilePage.assertUnfollowButtonIsVisible();

    await userProfilePage.openUserProfilePage(userProfileLink2);
    await userProfilePage.clickFollowButton();
    await userProfilePage.assertUnfollowButtonIsVisible();

    const homePage = new HomePage(pages[0], 1);
    await homePage.open();
    await homePage.assertArticleIsVisible(articleUser2.title);
    await homePage.assertArticleIsVisible(articleUser3.title);

});