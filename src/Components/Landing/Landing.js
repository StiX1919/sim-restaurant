import React, { Component } from 'react';
import axios from 'axios'

import {connect} from 'react-redux'
import './Landing.css';



class Landing extends Component {
  constructor(props) {
    super()


  }

  componentDidMount() {
    axios.get('/api/preLogin').then(response => {
      console.log('response', response)
    })
  }
  userLogin() {
    window.location.href= 'http://localhost:3000/api/login'
  }


  render() {


    return (
    <div className='page'>
      <div className="App">
        <h1>MEGA RPG</h1>
        <button onClick={() => this.userLogin()} >Login</button>
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Landing);