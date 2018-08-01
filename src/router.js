import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import Landing from './Components/Landing/Landing'
import Character from './Character'
import ChooseCharacter from './Components/ChooseCharacter/ChooseCharacter'
import CreateCharacter from './Components/CreateCharacter/CreateCharacter'



class Router extends Component{
    constructor(props){
        super(props)
    }
 render(){
     console.log('customer', this.props)
    return (
        <Switch>
            <Route exact path='/' component={Landing}/>
            <Route path='/poop' component={Character}/>
            <Route path='/characters' component={ChooseCharacter}/>
            <Route path='/newCharacter' component={CreateCharacter}/>
            {/* <Route path="/chome" component={CustomerHome}/>
            <Route path='/rhome' component={RunnerHome}/> */}
        </Switch>
        )
    }
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps)(Router))