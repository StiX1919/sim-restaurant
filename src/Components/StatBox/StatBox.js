import React, { Component } from 'react';
import axios from 'axios'

import {connect} from 'react-redux'
import './StatBox.css';

class StatBox extends Component {
    constructor(){
        super()
        this.state = {

        }


    }

    render() {
        return (
            <div className='statBox'>
                <h4>{this.props.statType}: </h4>
                
                
                {this.props.currStat}
                {this.props.statsLeft > 0 &&
                    <button onClick={() => this.props.statModifier('+', this.props.mod, this.props.currStat, this.props.statsLeft)}>{'>'}</button>
                }
                
            </div>
        )
    }
}   
const mapStateToProps = state => state

export default connect(mapStateToProps, {})(StatBox);