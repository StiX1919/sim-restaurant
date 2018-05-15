import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      color: 'red'
    }

    this.changeHeader = this.changeHeader.bind(this)
  }

  changeHeader() {
    axios.get('/api/getColor').then(response => {
      console.log(response.data)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" style={{'backgroundColor': this.state.color}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={() => this.changeHeader()}>Hello</button>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

      </div>
    );
  }
}

export default App;
