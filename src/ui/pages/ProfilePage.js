import { testStep } from '../../common/pwHelpers/pw';

export class ProfilePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }
  
  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async profilePage(username) {
    await this.step(`Go to ${username} profile`, async () =>{
      await this.page.goto(`/profile/${username}`);
    })
  }

  async followUser(username) {
    await this.step(`Follow user ${username}`, async () =>{
      const followButton = this.page.getByRole(
        'button', { name: `  Follow ${username}` }
      );
      await followButton.click();
    })
  }
}
