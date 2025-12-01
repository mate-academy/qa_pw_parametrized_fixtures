import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.articleTitleHeader = page.getByRole('heading');
    this.tagField = page.locator('input[placeholder*="Enter tags"], input[name="tag"]');

    // Editor chips & remove buttons (cover both tag-pill variants)
    this.editorTagChips = page.locator('.tag-list .tag-pill, .tag-list .tag-default.tag-pill');
    this.tagRemoveButtons = page.locator(
      '.tag-list .tag-pill .ion-close-round, ' +
      '.tag-list .tag-default.tag-pill .ion-close-round, ' +
      '.tag-list .tag-default.tag-pill button'
    );

    this.updateArticleButton = page.getByRole('button', { name: /Update Article|Publish Article/i });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertArticleTitle(title) {
    await this.step('Assert the article has correct title', async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await this.step('Assert the article has correct text', async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async clearAllTags() {
    await this.step('Clear all tags', async () => {
      for (let i = 0; i < 25; i++) {
        const before = await this.editorTagChips.count();
        if (before === 0) break;

        if (await this.tagRemoveButtons.count()) {
          await this.tagRemoveButtons.first().click();
        } else {
          // fallback for UIs that delete last token via Backspace
          await this.tagField.click();
          await this.page.keyboard.press('Backspace');
        }

        await expect(this.editorTagChips).toHaveCount(before - 1, { timeout: 2000 });
      }

      await this.tagField.fill('');
      await expect(this.editorTagChips).toHaveCount(0);
    });
  }

  async fillTagsField(tagsToAdd) {
    await this.step(
      `Add tags: ${Array.isArray(tagsToAdd) ? tagsToAdd.join(', ') : String(tagsToAdd)}`,
      async () => {
        const tags = Array.isArray(tagsToAdd)
          ? tagsToAdd
          : String(tagsToAdd ?? '')
              .split(',')
              .map(t => t.trim())
              .filter(Boolean);

        for (const tag of tags) {
          // skip duplicates
          const already = this.editorTagChips.filter({
            hasText: new RegExp(`^\\s*${escapeRegExp(tag)}\\s*$`),
          });
          if (await already.count()) continue;

          const before = await this.editorTagChips.count();

          await this.tagField.click();
          await this.tagField.fill(tag);
          await this.page.keyboard.press('Enter');

          await expect(this.editorTagChips).toHaveCount(before + 1, { timeout: 2000 });
        }
      }
    );
  }

  async clickUpdateArticleButton() {
    await this.updateArticleButton.click();
  }
}

// util
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
