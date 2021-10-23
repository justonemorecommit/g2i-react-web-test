import { createSelector } from 'reselect';

import { TriviaResult } from '../../../types';
import { RootState } from '../../rootReducer';

export const getState = (state: RootState) => state.questions;

export const getQuestionsLoading = createSelector(
  getState,
  (state) => state.questions.loading
);

export const getQuestions = createSelector(
  getState,
  (state) => state.questions.data
);

export const getQuestionsError = createSelector(
  getState,
  (state) => state.questions.error
);

export const getCurrentQuestion = createSelector(
  getState,
  (state) => state.questions.data[state.currentIndex] || null
);

export const getCurrentIndex = createSelector(
  getState,
  (state) => state.currentIndex
);

export const getQuestionsCount = createSelector(
  getState,
  (state) => state.questions.data.length
);

export const getAnswers = createSelector(getState, (state) => state.answers);

export const getResult = createSelector(
  getQuestions,
  getAnswers,
  (questions, answers): TriviaResult => {
    let correctCount = 0;
    let incorrectCount = 0;
    const correctness = questions.map((question, index) => {
      if (question.correct_answer === answers[index]) {
        correctCount += 1;
        return true;
      } else {
        incorrectCount += 1;
        return false;
      }
    });

    return {
      correctCount,
      incorrectCount,
      correctness,
      answers,
      questions,
    };
  }
);
