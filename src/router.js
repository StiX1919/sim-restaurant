import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux'

import Landing from './Components/Landing/Landing'
import App from './App'
import ChooseCharacter from './Components/ChooseCharacter/ChooseCharacter'



class Router extends Component{
    constructor(props){
        super(props)
    }
 render(){
     console.log('customer', this.props)
    return (
        <Switch>
            <Route exact path='/' component={Landing}/>
            <Route path='/characters' component={ChooseCharacter}/>
            {/* <Route path="/chome" component={CustomerHome}/>
            <Route path='/rhome' component={RunnerHome}/> */}
        </Switch>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Router)