import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Container, Col } from 'reactstrap'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { createStructuredSelector } from 'reselect'

import QuestionCard from '../../components/QuestionCard'
import { loadQuestions } from '../../store/modules/questions/actions'
import {
  getQuestions,
  getQuestionsError,
  getQuestionsLoading,
} from '../../store/modules/questions/selectors'
import { RootState } from '../../store/rootReducer'
import { Question } from '../../types'

interface SelectedProps {
  questions: Question[]
  loading: boolean
  error: any
}

const mapDispatch = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ loadQuestions }, dispatch)

type DispatchProps = ReturnType<typeof mapDispatch>

const mapState = createStructuredSelector<RootState, SelectedProps>({
  questions: getQuestions,
  loading: getQuestionsLoading,
  error: getQuestionsError,
})

type Props = SelectedProps & DispatchProps

function QuestionContainer(props: Props) {
  const { loadQuestions } = props

  useEffect(() => {
    loadQuestions()
  }, [])

  return (
    <Container className="pt-5">
      <Row>
        <Col
          xl={6}
          md={4}
          lg={2}
          className="offset-xl-3 offset-md-4 offset-lg-5">
          <QuestionCard
            question={{
              question: 'Are you sure? This is a very difficult question',
              category: 'Science',
              correct_answer: 'True',
              incorrect_answers: ['False'],
            }}></QuestionCard>
        </Col>
      </Row>
    </Container>
  )
}

export default connect(mapState, mapDispatch)(QuestionContainer)
