import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import _ from 'lodash';
import { RouteComponentProps } from 'react-router';

import { mockQuestion, mockRouteProps } from '../../app-test-lib/mock';
import {
  loadQuestions,
  submitAnswer,
} from '../../store/modules/questions/actions';
import {
  DispatchProps,
  SelectedProps,
  QuestionContainer,
} from './QuestionContainer';

const mockSelectedProps = (
  overrides: Partial<SelectedProps> = {}
): SelectedProps => {
  const totalCount = overrides?.totalCount || 10;
  const currentIndex =
    overrides?.currentIndex || Math.floor(Math.random() * totalCount);
  const questions = _.range(totalCount).map(mockQuestion);

  return {
    questions,
    loading: false,
    error: null,
    currentQuestion: questions[currentIndex],
    ...overrides,
    currentIndex,
    totalCount: questions.length,
  };
};

const mockDispatchProps = (
  overrides: Partial<DispatchProps>
): DispatchProps => ({
  loadQuestions: jest.fn() as unknown as typeof loadQuestions,
  submitAnswer: jest.fn() as unknown as typeof submitAnswer,
  ...overrides,
});

const renderComponent = (
  selectedOverrides: Partial<SelectedProps> = {},
  dispatchOverrides: Partial<DispatchProps> = {},
  routeOverrides: Partial<RouteComponentProps> = {}
) => {
  const selectedProps = mockSelectedProps(selectedOverrides);
  const dispatchProps = mockDispatchProps(dispatchOverrides);
  const routeProps = mockRouteProps('/questions/1', routeOverrides);

  return {
    renderResult: render(
      <QuestionContainer
        {...selectedProps}
        {...dispatchProps}
        {...routeProps}
      />
    ),
    selectedProps,
    dispatchProps,
    routeProps,
  };
};

it('should trigger loadQuestions action when mounted', () => {
  const { dispatchProps } = renderComponent();

  expect(dispatchProps.loadQuestions).toBeCalled();
});

it('should trigger submitAnswer action when user submitted', () => {
  const {
    dispatchProps,
    selectedProps: { currentQuestion },
  } = renderComponent();

  if (!currentQuestion) return;

  const anyAnswer = faker.random.arrayElement([
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ]);
  userEvent.click(screen.getByText(anyAnswer));
  userEvent.click(screen.getByText('SUBMIT'));

  expect(dispatchProps.submitAnswer).toBeCalledWith({ answer: anyAnswer });
});

it('should go to result page when user suggested all answers', () => {
  const {
    selectedProps: { currentQuestion },
    routeProps: { history },
  } = renderComponent({
    currentIndex: 10,
    totalCount: 10,
  });

  if (!currentQuestion) return;

  const anyAnswer = faker.random.arrayElement([
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ]);

  userEvent.click(screen.getByText(anyAnswer));
  userEvent.click(screen.getByText('SUBMIT'));

  expect(history.location.pathname).toBe('/result');
});
