import { faker } from '@faker-js/faker';

export function generateNewArticleData(tagNumber = 0, logger = null) {
  const tags = Array.from({ length: tagNumber }, () => faker.lorem.word());

  const article = {
    title: faker.lorem.words(5),
    description: faker.lorem.sentence(4),
    text: faker.lorem.sentences(2),
    tags,
  };

  // Логируем только если logger передан
  if (logger) {
    logger.debug(`Generated new article data: ${article}`);
  }

  return article;
}
