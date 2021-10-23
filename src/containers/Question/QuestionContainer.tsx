import { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';

import AppContainer from '../../components/AppContainer';
import QuestionCard from '../../components/QuestionCard';
import {
  loadQuestions,
  submitAnswer,
} from '../../store/modules/questions/actions';
import {
  getQuestions,
  getQuestionsError,
  getQuestionsLoading,
  getCurrentQuestion,
  getCurrentIndex,
  getQuestionsCount,
} from '../../store/modules/questions/selectors';
import { RootState } from '../../store/rootReducer';
import { Question } from '../../types';

interface SelectedProps {
  questions: Question[];
  loading: boolean;
  error: any;
  currentQuestion: Question | null;
  currentIndex: number;
  totalCount: number;
}

const mapDispatch = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ loadQuestions, submitAnswer }, dispatch);

type DispatchProps = ReturnType<typeof mapDispatch>;

const mapState = createStructuredSelector<RootState, SelectedProps>({
  questions: getQuestions,
  loading: getQuestionsLoading,
  error: getQuestionsError,
  currentQuestion: getCurrentQuestion,
  currentIndex: getCurrentIndex,
  totalCount: getQuestionsCount,
});

type Props = SelectedProps & DispatchProps & RouteComponentProps;

function QuestionContainer(props: Props) {
  const {
    currentQuestion,
    currentIndex,
    loading,
    totalCount,
    loadQuestions,
    submitAnswer,
    history,
  } = props;

  useEffect(() => {
    history.push('/questions/' + (currentIndex + 1));
  }, [currentIndex, history]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleSubmit = useCallback(
    (answer: string) => {
      submitAnswer({ answer });

      if (currentIndex === totalCount - 1) {
        history.push('/result');
      }
    },
    [history, totalCount, currentIndex, submitAnswer]
  );

  return (
    <AppContainer>
      <QuestionCard
        question={loading ? null : currentQuestion}
        onSubmit={handleSubmit}
        currentIndex={currentIndex}
        totalCount={totalCount}></QuestionCard>
    </AppContainer>
  );
}

export default connect(mapState, mapDispatch)(QuestionContainer);
