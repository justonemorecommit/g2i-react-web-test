import { useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  FormGroup,
  Label,
  Button,
} from 'reactstrap'

import { Question } from '../../types'
import './QuestionCard.styles.scss'

interface Props {
  question: Question | null
}

function QuestionCard(props: Props) {
  const { question } = props

  return (
    <Card tag="article" className="question-card">
      <CardHeader className="d-flex">
        {question ? (
          <h5>Question</h5>
        ) : (
          <div className="w-100">
            <Skeleton width="50%" height="40px" />
          </div>
        )}

        <div className="ms-auto">
          {question ? (
            <span>1&nbsp;/&nbsp;3</span>
          ) : (
            <Skeleton width="50px" height="25px" />
          )}
        </div>
      </CardHeader>
      <CardBody>
        <section className="mb-3">
          {question ? question.question : <Skeleton count={3} height="30px" />}
        </section>
        {question ? (
          <FormGroup tag="fieldset">
            <legend>Answers</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" /> True
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" /> False
              </Label>
            </FormGroup>
          </FormGroup>
        ) : (
          <>
            <Skeleton width="200px" height="40px" />
            <Skeleton width="100px" height="30px" />
            <Skeleton width="100px" height="30px" />
          </>
        )}
      </CardBody>
      <CardFooter className="d-flex">
        {question ? (
          <Button className="ms-auto" color="primary">
            Submit
          </Button>
        ) : (
          <div className="ms-auto">
            <Skeleton width="100px" height="40px" />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default QuestionCard
