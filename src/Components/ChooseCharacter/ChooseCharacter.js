import React, {Component} from 'react'

import axios from 'axios'

import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import CCC from '../ChooseCharacterCard/CCC'

import {getUser, getHeroes} from '../../ducks/userReducer'

import './ChooseCharacter.css'

class ChooseCharacter extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        this.props.getUser()
        this.props.getHeroes()
      }

    render() {
        let heroCards = (<h2>No heroes yet</h2>)
        if(this.props.heroes[0]) {
            heroCards = this.props.heroes.map((hero, ind) => {
                return  <CCC hero={hero}/>
            })
        }
        return(
            <div>
                <Link to='/poop'><h1>ChooseCharacter</h1></Link>
                {heroCards}
                {this.props.isLoading !== true && this.props.heroes.length < 5 &&
                    <Link to ='/newCharacter'><button>Create new character</button></Link>
                }
                
            </div>
        )
    }
}
const mapStateToProps = state => ({...state.reducer, ...state.userReducer})

export default withRouter(connect(mapStateToProps, {getUser, getHeroes})(ChooseCharacter));