import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-tooltip/assets/bootstrap.css';
import { useRef } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Store } from 'redux';

import Routes from './Routes';
import Layout from './containers/Layout';
import history from './history';
import configureStore from './store';

function App() {
  const { current: store } = useRef<Store>(configureStore());

  return (
    <Provider store={store}>
      <Layout>
        <Router history={history}>
          <Routes />
        </Router>
      </Layout>
    </Provider>
  );
}

export default App;
