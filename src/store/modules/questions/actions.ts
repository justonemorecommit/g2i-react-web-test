import { createAsyncThunk } from '@reduxjs/toolkit'

import * as QuestionService from '../../../services/question.service'

export const loadQuestions = createAsyncThunk('loadQuestion', () =>
  QuestionService.loadQuestions()
)
