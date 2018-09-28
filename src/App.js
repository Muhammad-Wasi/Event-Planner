import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from './Routes/Routes';

import './App.css';

class App extends Component {
  render() {
    return (
      // <Provider >
        <Routes />
      // </Provider>
    );
  }
}

export default App;
