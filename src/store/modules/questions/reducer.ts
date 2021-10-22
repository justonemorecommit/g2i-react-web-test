import { createReducer } from '@reduxjs/toolkit'

import { Question } from '../../../types'
import { loadQuestions, submitAnswer } from './actions'

interface ModuleState {
  questions: {
    loading: boolean
    data: Question[]
    error: any
  }
  currentIndex: number
}

const reducer = createReducer<ModuleState>(
  {
    questions: {
      loading: false,
      data: [],
      error: null,
    },
    currentIndex: 0,
  },
  (builder) =>
    builder
      .addCase(loadQuestions.pending, (state) => {
        state.questions.loading = true
        state.questions.error = null
      })
      .addCase(loadQuestions.fulfilled, (state, { payload }) => {
        state.questions.loading = false
        state.questions.data = payload.data.results
      })
      .addCase(loadQuestions.rejected, (state, { payload }) => {
        state.questions.loading = false
        state.questions.error = payload
      })
      .addCase(submitAnswer, (state, { payload }) => {})
)

export default reducer
