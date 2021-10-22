import { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { createStructuredSelector } from 'reselect'

import QuestionCard from '../../components/QuestionCard'
import { loadQuestions } from '../../store/modules/questions/actions'
import {
  getQuestions,
  getQuestionsError,
  getQuestionsLoading,
  getCurrentQuestion,
  getCurrentIndex,
  getQuestionsCount,
} from '../../store/modules/questions/selectors'
import { RootState } from '../../store/rootReducer'
import { Question } from '../../types'

interface SelectedProps {
  questions: Question[]
  loading: boolean
  error: any
  currentQuestion: Question | null
  currentIndex: number
  totalCount: number
}

const mapDispatch = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ loadQuestions }, dispatch)

type DispatchProps = ReturnType<typeof mapDispatch>

const mapState = createStructuredSelector<RootState, SelectedProps>({
  questions: getQuestions,
  loading: getQuestionsLoading,
  error: getQuestionsError,
  currentQuestion: getCurrentQuestion,
  currentIndex: getCurrentIndex,
  totalCount: getQuestionsCount,
})

type Props = SelectedProps & DispatchProps

function QuestionContainer(props: Props) {
  const { currentQuestion, currentIndex, totalCount, loadQuestions } = props

  useEffect(() => {
    loadQuestions()
  }, [loadQuestions])

  const handleSubmit = useCallback(() => {}, [])

  return (
    <Container className="pt-5 d-flex justify-content-center">
      <QuestionCard
        question={currentQuestion}
        onSubmit={handleSubmit}
        currentIndex={currentIndex}
        totalCount={totalCount}></QuestionCard>
    </Container>
  )
}

export default connect(mapState, mapDispatch)(QuestionContainer)
