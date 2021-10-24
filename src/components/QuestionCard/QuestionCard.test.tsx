import { render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';

import { Question } from '../../types';
import QuestionCard, { Props as QuestionProps } from './QuestionCard';

const question: Question = {
  question: faker.lorem.sentence(),
  correct_answer: 'True',
  incorrect_answers: ['False'],
  category: faker.name.title(),
};
const totalCount = 10;
const currentIndex = 6;

const renderLoadedElement = (overrides: Partial<QuestionProps> = {}) =>
  render(
    <QuestionCard
      question={question}
      totalCount={totalCount}
      currentIndex={currentIndex}
      onSubmit={() => {}}
      {...overrides}
    />
  );

const clickAnyAnswer = (
  element: ReturnType<typeof renderLoadedElement>,
  correctOnly = false
) => {
  const answers = [
    question.correct_answer,
    ...(correctOnly ? [] : question.incorrect_answers),
  ];

  const answer = faker.random.arrayElement(answers);
  const answerEl = element.queryByText(answer);
  if (!answerEl) return { answer: null };
  fireEvent(answerEl, new MouseEvent('click'));
  return { answer };
};

it('should show spinner when loading', () => {
  const element = render(
    <QuestionCard
      question={null}
      totalCount={totalCount}
      currentIndex={0}
      onSubmit={() => {}}
    />
  );

  expect(
    element.container.querySelector('.react-loading-skeleton')
  ).toBeInTheDocument();
});

it('should renders elements', () => {
  const element = renderLoadedElement();

  const button = element.container.querySelector('button[type="SUBMIT"]');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('SUBMIT');

  expect(element.queryByText(question.question)).toBeInTheDocument();
  expect(element.queryByText(question.category)).toBeInTheDocument();
  expect(element.queryByText(question.correct_answer)).toBeInTheDocument();
  question.incorrect_answers.map((answer) => {
    expect(element.queryByText(answer)).toBeInTheDocument();
  });
});

it('should disable submit button if user did not select answer', () => {
  const element = renderLoadedElement();

  expect(element.queryByText('SUBMIT')).toBeDisabled();
});

it('should enable submit button if user selected any answer', () => {
  const element = renderLoadedElement();

  clickAnyAnswer(element);
  expect(element.queryByText('SUBMIT')).toBeEnabled();
});

it('should unset checked state of all answers with new question', async () => {
  const element = renderLoadedElement();

  clickAnyAnswer(element);
  act(() =>
    element.rerender(
      <QuestionCard
        question={{ ...question, question: faker.lorem.sentence() }}
        totalCount={totalCount}
        currentIndex={currentIndex}
        onSubmit={() => {}}
      />
    )
  );

  expect(
    element.container.querySelectorAll('input[checked=true]')
  ).toHaveLength(0);

  expect(element.queryByText('SUBMIT')).toBeDisabled();
});

it('should fire submit event when user clicked button', () => {
  const onSubmit = jest.fn<void, [string]>();
  const element = render(
    <QuestionCard
      question={question}
      totalCount={totalCount}
      currentIndex={currentIndex}
      onSubmit={onSubmit}
    />
  );

  const { answer: clickedAnswer } = clickAnyAnswer(element);
  const submitButton = element.queryByText('SUBMIT');
  submitButton && userEvent.click(submitButton);
  expect(onSubmit).toHaveBeenCalledWith(clickedAnswer);
});
