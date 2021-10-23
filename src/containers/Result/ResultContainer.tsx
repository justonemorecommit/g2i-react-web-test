import { useCallback } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button, CardBody, CardFooter, CardHeader } from 'reactstrap';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';

import AnswerList from '../../components/AnswerList';
import AppCard, { AppCardTitle } from '../../components/AppCard';
import AppContainer from '../../components/AppContainer';
import { playAgain } from '../../store/modules/questions/actions';
import { getResult } from '../../store/modules/questions/selectors';
import { RootState } from '../../store/rootReducer';
import { TriviaResult } from '../../types';

interface SelectedProps {
  result: TriviaResult;
}

const mapState = createStructuredSelector<RootState, SelectedProps>({
  result: getResult,
});

const mapDispatch = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      playAgain,
    },
    dispatch
  );

type DispatchProps = ReturnType<typeof mapDispatch>;

type Props = SelectedProps & DispatchProps & RouteComponentProps;

function ResultCard(props: Props) {
  const {
    result: { correctness, correctCount, questions },
    history,
    playAgain,
  } = props;

  const handlePlayAgain = useCallback(() => {
    playAgain();

    history.push('/');
  }, [history, playAgain]);

  return (
    <AppContainer>
      <AppCard>
        <CardHeader>
          <AppCardTitle title="You scored" />
          <AppCardTitle title={`${correctCount} / ${questions.length}`} />
        </CardHeader>
        <CardBody>
          <AnswerList questions={questions} correctness={correctness} />
        </CardBody>
        <CardFooter className="d-flex justify-content-center">
          <Button type="button" onClick={handlePlayAgain}>
            PLAY AGAIN?
          </Button>
        </CardFooter>
      </AppCard>
    </AppContainer>
  );
}

export default connect(mapState, mapDispatch)(ResultCard);
