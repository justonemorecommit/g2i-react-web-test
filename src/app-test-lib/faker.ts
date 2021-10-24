import faker from 'faker';

import { Question } from '../types';

const randomAnswer = (question: Question) =>
  faker.random.arrayElement([
    ...question.incorrect_answers,
    question.correct_answer,
  ]);

export { randomAnswer };
