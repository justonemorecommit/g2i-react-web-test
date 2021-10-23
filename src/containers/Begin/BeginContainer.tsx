import { useCallback } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, CardBody, CardFooter } from 'reactstrap'

import AppCard from '../../components/AppCard'
import AppContainer from '../../components/AppContainer'
import './BeginContainer.styles.scss'

type Props = RouteComponentProps

function Begin(props: Props) {
  const { history } = props

  const handleClickBegin = useCallback(() => {
    history.push('/questions/1')
  }, [history])

  return (
    <div className="begin-container">
      <AppContainer>
        <AppCard className="begin-card">
          <CardBody>
            <h1 className="page-title">Welcome to the Trivia Challenge!</h1>
            <p className="begin-text">
              You will be presented with 10 True or False questions.
            </p>
            <p className="begin-text mb-5">Can you score 100%?</p>
          </CardBody>
          <CardFooter className="d-flex justify-content-center">
            <Button onClick={handleClickBegin}>BEGIN</Button>
          </CardFooter>
        </AppCard>
      </AppContainer>
    </div>
  )
}

export default Begin
