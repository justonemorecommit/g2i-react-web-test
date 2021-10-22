import { Switch, Route } from 'react-router'

import Question from './containers/Question'

function Routes() {
  return (
    <Switch>
      <Route path="/questions/:index" component={Question} />
    </Switch>
  )
}

export default Routes
