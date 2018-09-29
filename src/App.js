import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from './Routes/Routes';
import store from './Store';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <Routes />
      </Provider>
    );
  }
}

export default App;
