import _ from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
import AppCard from '../AppCard'
import './QuestionCard.styles.scss'

interface Props {
  question: Question | null
  currentIndex: number
  totalCount: number
  onSubmit: (answer: string) => void
}

function QuestionCard(props: Props) {
  const { question, currentIndex, totalCount, onSubmit } = props
  const [selected, setSelected] = useState<string | null>(null)

  const answers = useMemo(() => {
    return _.compact(
      _.flatten([question?.correct_answer, question?.incorrect_answers])
    ).sort(() => Math.random() - Math.random())
  }, [question])

  useEffect(() => {
    setSelected(null)
  }, [question])

  const handleClick = useCallback((answer: string) => {
    setSelected(answer)
  }, [])

  const handleSubmit = useCallback(() => {
    if (!selected) return

    onSubmit(selected)
  }, [onSubmit, selected])

  return (
    <AppCard tag="article" className="question-card">
      <CardHeader className="d-flex d-flex justify-content-center">
        {question ? (
          <h5 className="category">{question.category}</h5>
        ) : (
          <Skeleton width="100px" height="40px" />
        )}
      </CardHeader>
      <CardBody className="d-flex align-items-center flex-column">
        <section className="mb-3 question-text">
          {question ? (
            <span
              dangerouslySetInnerHTML={{ __html: question.question }}></span>
          ) : (
            <Skeleton count={5} width="200px" height="40px" />
          )}
        </section>
        <div>
          {question ? (
            <span>
              {currentIndex + 1}&nbsp;/&nbsp;{totalCount}
            </span>
          ) : (
            <Skeleton width="50px" height="25px" />
          )}
        </div>
        {question ? (
          <FormGroup tag="fieldset" className="mt-5">
            <legend>Answers</legend>
            {answers.map((answer) => (
              <FormGroup check key={answer}>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    checked={selected === answer}
                    onChange={() => handleClick(answer)}
                  />{' '}
                  {answer}
                </Label>
              </FormGroup>
            ))}
          </FormGroup>
        ) : (
          <>
            <Skeleton width="200px" height="40px" />
            <Skeleton width="100px" height="30px" />
            <Skeleton width="100px" height="30px" />
          </>
        )}
      </CardBody>
      <CardFooter className="d-flex justify-content-center">
        {question ? (
          <Button onClick={handleSubmit} disabled={!selected}>
            Submit
          </Button>
        ) : (
          <Skeleton width="100px" height="40px" />
        )}
      </CardFooter>
    </AppCard>
  )
}

export default QuestionCard
