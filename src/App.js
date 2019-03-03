import React, { Component } from 'react';
import './App.css';
import ShowStock from './components/ShowStock.jsx';


class App extends Component {
  render() {
    return (
      <div className="App">
        <ShowStock></ShowStock>
      </div>
    );
  }
}

export default App;
