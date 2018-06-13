import React, { Component } from 'react';
import axios from 'axios'

import {connect} from 'react-redux'
import './MonsterBox.css';

class MonsterBox extends Component {
    constructor(){
        super()
        this.state = {

        }


    }

    render() {
        return (
            <div>
                <h2>{this.props.currentMonster.name}</h2>
                <h4>{this.props.currentMonster.description}</h4>
                <h4>Current HP: {this.props.monsterHP}</h4>
            </div>
        )
    }

}   
const mapStateToProps = state => state

export default connect(mapStateToProps, {})(MonsterBox);