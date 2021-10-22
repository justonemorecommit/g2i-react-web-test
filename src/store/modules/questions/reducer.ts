import { createReducer } from '@reduxjs/toolkit'

import { Question } from '../../../types'
import { loadQuestions } from './actions'

interface ModuleState {
  questions: {
    loading: boolean
    data: Question[]
    error: any
  }
}

const reducer = createReducer<ModuleState>(
  {
    questions: {
      loading: false,
      data: [],
      error: null,
    },
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
)

export default reducer
