import { Question } from '../types';
import API from './api.service';

interface LoadQuestionsResponse {
  results: Question[];
}

const loadQuestions = () => {
  return API.get<LoadQuestionsResponse>(
    'api.php?amount=10&difficulty=hard&type=boolean'
  );
};

export type { LoadQuestionsResponse };

export { loadQuestions };
