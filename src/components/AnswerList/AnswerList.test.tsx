import { within } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import faker from 'faker';
import _ from 'lodash';
import { act } from 'react-dom/test-utils';

import { Question } from '../../types';
import AnswerList from './AnswerList';

const questions: Question[] = _.range(0, 10).map(() => ({
  question: faker.lorem.sentence(),
  category: faker.name.title(),
  correct_answer: 'True',
  incorrect_answers: ['False'],
}));
const correctness: boolean[] = _.range(0, 10).map(() => Math.random() >= 0.5);

it('renders a list', () => {
  act(() => {
    render(<AnswerList questions={questions} correctness={correctness} />);
  });

  questions.forEach((question, index) => {
    const element = screen.getByTestId(question.question);
    const correct = correctness[index];
    const questionText = within(element).getByText(question.question);

    expect(
      within(element).getByTestId(correct ? 'icon-correct' : 'icon-incorrect')
    ).toBeInTheDocument();
    expect(element).toBeInTheDocument();
    expect(questionText).toBeInTheDocument();
  });
});
