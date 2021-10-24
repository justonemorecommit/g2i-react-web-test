import faker from 'faker';
import { createMemoryHistory, createLocation } from 'history';
import { RouteComponentProps } from 'react-router';

const mockQuestion = () => {
  const correct_answer = faker.random.arrayElement(['True', 'False']);
  return {
    question: faker.lorem.sentence(),
    correct_answer: correct_answer,
    incorrect_answers: [correct_answer === 'True' ? 'False' : 'True'],
    category: faker.lorem.word(),
  };
};

const mockRouteProps = (
  pathname: string,
  overrides: Partial<RouteComponentProps> = {}
): RouteComponentProps => ({
  history: createMemoryHistory(),
  location: createLocation(pathname),
  match: { params: {}, path: pathname, isExact: false, url: pathname },
  ...overrides,
});

export { mockQuestion, mockRouteProps };
