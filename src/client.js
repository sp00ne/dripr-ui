require('babel-core/polyfill');
import ga from 'ga-react-router';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import Root from './components/Root';
import {createHistory} from 'history';
import {ActionTypes} from './constants';
import getRoutes from './routes';
import {Router} from 'react-router';
import {syncReduxAndRouter} from 'redux-simple-router';
import apiClient from './apiClient';
//import { UserAuthWrapper } from 'redux-auth-wrapper';


const store = configureStore(window.$STATE, apiClient(window.$STATE.app.authInfo));
const history = createHistory();

/*
// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user, // how to get the user state
  redirectAction: routeActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});
*/
const routes = getRoutes(store);
history.listen(location => {
  ga('set', 'page', location.pathname)
  ga('send', 'pageview');
});

store.dispatch({type: ActionTypes.REHYDRATE});
syncReduxAndRouter(history, store);

render(
  <Root store={store}>
    <Router routes={routes} history={history}/>
  </Root>, document.getElementById('root'));
