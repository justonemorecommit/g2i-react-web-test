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
  correctIndexes: number[]
}

const reducer = createReducer<ModuleState>(
  {
    questions: {
      loading: false,
      data: [],
      error: null,
    },
    currentIndex: 0,
    correctIndexes: [],
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
      .addCase(submitAnswer, (state, { payload }) => {
        const currentQuestion = state.questions.data[state.currentIndex]

        if (currentQuestion.correct_answer === payload.answer) {
          state.correctIndexes.push(state.currentIndex)
        }

        state.currentIndex += 1
      })
)

export default reducer
