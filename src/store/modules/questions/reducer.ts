import { createReducer } from '@reduxjs/toolkit';

import { Question } from '../../../types';
import { loadQuestions, playAgain, submitAnswer } from './actions';

interface ModuleState {
  questions: {
    loading: boolean;
    data: Question[];
    error: any;
  };
  currentIndex: number;
  answers: string[];
}

const reducer = createReducer<ModuleState>(
  {
    questions: {
      loading: false,
      data: [],
      error: null,
    },
    currentIndex: 0,
    answers: [],
  },
  (builder) =>
    builder
      .addCase(loadQuestions.pending, (state) => {
        state.questions.loading = true;
        state.questions.error = null;
      })
      .addCase(loadQuestions.fulfilled, (state, { payload }) => {
        state.questions.loading = false;
        state.questions.data = payload.data.results;
      })
      .addCase(loadQuestions.rejected, (state, { payload }) => {
        state.questions.loading = false;
        state.questions.error = payload;
      })
      .addCase(submitAnswer, (state, { payload }) => {
        state.answers[state.currentIndex] = payload.answer;

        state.currentIndex += 1;

        if (state.currentIndex === state.questions.data.length) {
          state.currentIndex = 0;
        }
      })
      .addCase(playAgain, (state) => {
        state.currentIndex = 0;
        state.answers = [];
      })
);

export default reducer;
