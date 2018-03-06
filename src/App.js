import React, { Component } from 'react';

import { AsyncStorage } from 'react-native';

import { StackNavigator, DrawerNavigator, addNavigationHelpers } from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import thunk from 'redux-thunk';
import {reducer as formReducer } from 'redux-form';
import devTools from 'remote-redux-devtools';

import { Root } from "native-base";

import reducer from './reducers';
import promise from './promise';

import SideBar from "./components/sidebar";
import Home from "./components/home";
import TransactionPage from "./components/transactionPage";
import PayrollPage from "./components/payrollPage";
import Login from "./components/login";
import SignUp from "./components/signUp";
import SignUpConfirm from "./components/signUpConfirm";


import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';

import { withAuthenticator, Authenticator } from 'aws-amplify-react-native';

Amplify.configure(aws_exports);

// Drawer (사이드 메뉴))
const Drawer = DrawerNavigator({
  TransactionPage: { screen: TransactionPage },
  PayrollPage: { screen: PayrollPage }
},
{
  initialRouteName: "TransactionPage",
  contentComponent: props => <SideBar {...props} />
})

// 메인 네비게이션
const AppNavigator = StackNavigator({
  SignUp: { screen: SignUp },
  SignUpConfirm: { screen: SignUpConfirm },
  Login: { screen: Login },
  Drawer: { screen: Drawer },
},
{
  headerMode: "none"
});


const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducer);

const navInitialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

const navReducer = (state = navInitialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const addListener = createReduxBoundAddListener("root");

const mapStateToProps = (state) => ({
  nav: state.nav
});

const enhancer = compose(
  applyMiddleware(thunk, promise, navMiddleware),
  devTools({
    name: 'hotch', realtime: true
  }),
);


const combinedReducers = combineReducers({
    persist: persistedReducer,
    form: formReducer,
    nav: navReducer
})

const store = createStore(combinedReducers, enhancer);

const persister = persistStore(store);

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener,
      })} />
    )
  }
}

const AppWithNavigationState = connect(mapStateToProps)(App);

class AppRoot extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <AppWithNavigationState />
        </PersistGate>
      </Provider>
    );
  }
}

export default AppRoot
