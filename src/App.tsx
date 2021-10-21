import { Provider } from 'react-redux'
import { Router } from 'react-router'

import history from './history'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router history={history}></Router>
    </Provider>
  )
}

export default App
