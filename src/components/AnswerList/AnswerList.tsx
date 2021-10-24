import Icons from 'bootstrap-icons/bootstrap-icons.svg';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { Question } from '../../types';
import './AnswerList.styles.scss';

interface Props {
  correctness: boolean[];
  questions: Question[];
}

function AnswerList(props: Props) {
  const { questions, correctness } = props;

  return (
    <ListGroup className="answer-list-group">
      {questions.map((question, index) => (
        <ListGroupItem
          key={question.question}
          className="d-flex"
          data-testid={question.question}>
          <div className="list-group-item__icon-wrapper">
            {correctness[index] ? (
              <svg
                className="bi"
                width="20px"
                height="20px"
                fill="currentColor"
                data-testid="icon-correct">
                <use xlinkHref={`${Icons}#plus-lg`}></use>
              </svg>
            ) : (
              <svg
                className="bi"
                width="20px"
                height="20px"
                fill="currentColor"
                data-testid="icon-incorrect">
                <use xlinkHref={`${Icons}#dash-lg`}></use>
              </svg>
            )}
          </div>
          <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default AnswerList;
