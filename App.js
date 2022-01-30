import React from "react";
import { LogBox } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import MainNavigator from "./navigation/MainNavigator";

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  //LogBox.ignoreLogs(['Setting a timer']);
  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
