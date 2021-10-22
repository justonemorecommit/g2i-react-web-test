import 'bootstrap/dist/css/bootstrap.min.css'
import 'rc-tooltip/assets/bootstrap.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import Routes from './Routes'
import Layout from './containers/Layout'
import history from './history'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Router history={history}>
          <Routes />
        </Router>
      </Layout>
    </Provider>
  )
}

export default App
