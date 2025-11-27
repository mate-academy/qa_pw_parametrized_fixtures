import { ProfilePage } from '../../pages/ProfilePage';

export async function followUser (page, id, username) {
  const profilePage = new ProfilePage (page, id);
  await profilePage.profilePage(username);
  await profilePage.followUser(username);
}