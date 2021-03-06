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

import { Root, StyleProvider } from "native-base";

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

import getTheme from "./theme/components";
import variables from "./theme/variables/commonColor";


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

const persistedReducer = persistReducer(persistConfig, reducer);


const combinedReducers = combineReducers({
    persist: persistedReducer,
    form: formReducer,
    nav: navReducer
})

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
  constructor() {
    super();
    this.state = {
      readyFlag: false,
      store: createStore(combinedReducers, enhancer)
    }
    this.persistor = persistStore(this.state.store);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
    this.setState({ readyFlag: true });
  }

  render() {
    if (!this.state.readyFlag) {
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={this.state.store}>
        <PersistGate loading={null} persistor={this.persistor}>
          <StyleProvider style={getTheme(variables)}>
            <AppWithNavigationState />
          </StyleProvider>
          </PersistGate>
      </Provider>
    );
  }
}

export default AppRoot
