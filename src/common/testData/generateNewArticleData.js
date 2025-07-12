import { faker } from '@faker-js/faker';

export function generateNewArticleData(logger = undefined, tagNumber = 0) {
  const tags = Array.from({ length: tagNumber }, () => faker.lorem.word());

  const article = {
    title: faker.lorem.words(5),
    description: faker.lorem.sentence(4),
    text: faker.lorem.sentences(2),
    tags,
  };
  if (logger !== undefined) {
    logger.debug(`Generated new article data: ${article}`);
  }
  
  return article;
}
