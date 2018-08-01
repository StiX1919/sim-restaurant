import React, {Component} from 'react'

import axios from 'axios'

import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import './ChooseCharacter.css'

class ChooseCharacter extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        axios.get('/api/preLogin').then(response => {
          console.log('response', response)
        })
      }

    render() {
        return(
            <div>
                <Link to='/poop'><h1>ChooseCharacter</h1></Link>
                <Link to ='/newCharacter'><button>Create new character</button></Link>
            </div>
        )
    }
}
const mapStateToProps = state => ({...state.reducer})

export default withRouter(connect(mapStateToProps)(ChooseCharacter));