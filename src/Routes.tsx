import { Switch, Route } from 'react-router'

import Begin from './containers/Begin'
import Question from './containers/Question'
import Result from './containers/Result'

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Begin} />
      <Route path="/questions/:index" component={Question} />
      <Route path="/result" component={Result} />
    </Switch>
  )
}

export default Routes
