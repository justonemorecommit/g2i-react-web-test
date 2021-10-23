import { combineReducers } from '@reduxjs/toolkit';

import questionsReducer from './modules/questions';

const rootReducer = combineReducers({
  questions: questionsReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
export type { RootState };
