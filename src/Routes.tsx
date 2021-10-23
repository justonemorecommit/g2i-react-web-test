import { Switch, Route } from 'react-router'

import Begin from './containers/Begin'
import Question from './containers/Question'

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Begin} />
      <Route path="/questions/:index" component={Question} />
    </Switch>
  )
}

export default Routes
