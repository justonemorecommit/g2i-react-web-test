import Icons from 'bootstrap-icons/bootstrap-icons.svg'
import { ListGroup, ListGroupItem } from 'reactstrap'

import { Question } from '../../types'
import './AnswerList.styles.scss'

interface Props {
  correctness: boolean[]
  questions: Question[]
}

function AnswerList(props: Props) {
  const { questions, correctness } = props

  return (
    <ListGroup className="answer-list-group">
      {questions.map((question, index) => (
        <ListGroupItem key={question.question} className="d-flex">
          <div className="list-group-item__icon-wrapper">
            <svg className="bi" width="20px" height="20px" fill="currentColor">
              <use
                xlinkHref={`${Icons}#${
                  correctness[index] ? 'plus-lg' : 'dash-lg'
                }`}></use>
            </svg>
          </div>
          <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}

export default AnswerList
