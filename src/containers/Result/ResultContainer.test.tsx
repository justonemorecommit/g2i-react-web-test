import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';

import { randomAnswer } from '../../app-test-lib/faker';
import { mockQuestion, mockRouteProps } from '../../app-test-lib/mock';
import { playAgain } from '../../store/modules/questions/actions';
import { DispatchProps, ResultCard, SelectedProps } from './ResultContainer';

const mockSelectedProps = (): SelectedProps => {
  const questions = _.range(10).map(mockQuestion);
  const answers = questions.map(randomAnswer);
  const correctness = answers.map(
    (answer, index) => answer === questions[index].correct_answer
  );

  return {
    result: {
      questions,
      answers,
      correctness,
      correctCount: correctness.filter((item) => item).length,
      incorrectCount: correctness.filter((item) => !item).length,
    },
  };
};

const mockDispatchProps = (): DispatchProps => {
  return {
    playAgain: jest.fn() as unknown as typeof playAgain,
  };
};

const renderComponent = () => {
  const selectedProps = mockSelectedProps();
  const dispatchProps = mockDispatchProps();
  const routeProps = mockRouteProps('/result');

  const renderResult = render(
    <ResultCard {...selectedProps} {...dispatchProps} {...routeProps} />
  );

  return {
    selectedProps,
    dispatchProps,
    routeProps,
    renderResult,
  };
};

it('should show results', () => {
  const {
    selectedProps: {
      result: { questions, correctCount, incorrectCount },
    },
  } = renderComponent();

  expect(
    screen.getByText(`${correctCount} / ${questions.length}`)
  ).toBeInTheDocument();
  questions.forEach((question) => {
    expect(screen.getByText(question.question)).toBeInTheDocument();
  });
  expect(screen.getByText('PLAY AGAIN?')).toBeInTheDocument();
});

it('should trigger playAgain action', () => {
  const { dispatchProps } = renderComponent();

  userEvent.click(screen.getByText('PLAY AGAIN?'));

  expect(dispatchProps.playAgain).toBeCalled();
});
