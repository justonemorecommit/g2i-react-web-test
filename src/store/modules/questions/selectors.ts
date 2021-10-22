import { createSelector } from 'reselect'

import { RootState } from '../../rootReducer'

export const getState = (state: RootState) => state.questions

export const getQuestionsLoading = createSelector(
  getState,
  (state) => state.questions.loading
)

export const getQuestions = createSelector(
  getState,
  (state) => state.questions.data
)

export const getQuestionsError = createSelector(
  getState,
  (state) => state.questions.error
)
