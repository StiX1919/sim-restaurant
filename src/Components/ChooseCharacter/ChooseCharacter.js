import React, {Component} from 'react'

import axios from 'axios'
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
                <h1>ChooseCharacter</h1>
                <button>Create new character</button>
            </div>
        )
    }
}
const mapStateToProps = state => state

export default connect(mapStateToProps)(ChooseCharacter);