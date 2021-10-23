import _ from 'lodash'
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

export const getCurrentQuestion = createSelector(
  getState,
  (state) => state.questions.data[state.currentIndex] || null
)

export const getCurrentIndex = createSelector(
  getState,
  (state) => state.currentIndex
)

export const getQuestionsCount = createSelector(
  getState,
  (state) => state.questions.data.length
)

export const getCorrectAnswers = createSelector(getState, (state) =>
  state.correctIndexes.map((index) => state.questions.data[index])
)

export const getIncorrectAnswers = createSelector(getState, (state) =>
  _.difference(
    _.range(0, state.questions.data.length),
    state.correctIndexes
  ).map((index) => state.questions.data[index])
)
