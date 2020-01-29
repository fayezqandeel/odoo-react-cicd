import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route,  } from 'react-router-dom';
import { routes, PrivateRoute } from './config/routes';
import store from './config/store';
import history from './config/history';
import './app.scss';
const App = (props) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div id="app-container">
          <div className="content-container">
          
            {
              routes.map((route, index) => {
                if (route.requiredAuth) {
                  return (
                    <div>
                      <PrivateRoute
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                      />
                    </div>
                  );
                } else {
                  return <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />;
                }
              })
            }
          </div>
        </div>
      </Router>
    </Provider>
  );
  
}

export default App;
