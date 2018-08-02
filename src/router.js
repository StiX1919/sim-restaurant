import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import Landing from './Components/Landing/Landing'
import MainPage from './Components/MainPage/MainPage'
import ChooseCharacter from './Components/ChooseCharacter/ChooseCharacter'
import CreateCharacter from './Components/CreateCharacter/CreateCharacter'



class Router extends Component{
    constructor(props){
        super(props)
    }
    
 render(){
    return (
        <Switch>
            <Route exact path='/' component={Landing}/>
            <Route path='/characters' component={ChooseCharacter}/>
            {this.props.user ?
                <div>
                    <Route path='/hero/:heroID' component={MainPage}/>
                    <Route path='/newCharacter' component={CreateCharacter}/>
                </div>
                : <Redirect to="/"/>
            }
            
            {/* <Route path="/chome" component={CustomerHome}/>
            <Route path='/rhome' component={RunnerHome}/> */}
        </Switch>
        )
    }
}

const mapStateToProps = state => ({...state.userReducer})

export default withRouter(connect(mapStateToProps)(Router))