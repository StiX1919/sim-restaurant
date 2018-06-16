import React, { Component } from 'react';
import axios from 'axios'

import {connect} from 'react-redux'
import './CharacterBox.css';

import StatBox from '../StatBox/StatBox'

import {statModifier,
        levelUp} from '../../ducks/reducer'

class CharacterBox extends Component {
    constructor(){
        super()
        this.state = {
            level: 1,
            exp: 0,
            nextLevel: 100,
            strengthStat: 2,
            speedStat: 2,
            defenseStat: 2,
            statPoints: 3,
        }


    }

      

    render() {
        return (
            <div className='mainBox'>
                <h1>Create Your Character</h1>
                <div>
                    <h3>Character Name</h3>
                    <input />
                    <h3>Job</h3>
                    <input />
                    <h4>Level: {this.props.level}</h4>
                    {this.props.exp >= this.props.nextLevel &&
                        <button onClick={() => this.props.levelUp(this.props.exp, this.props.level, this.props.nextLevel, this.props.statPoints)}>Level Up</button>
                    }
                    <h4>EXP: {this.props.exp}/{this.props.nextLevel}</h4>
                    <h4>Available Stat Points</h4>
                    <h4>{this.props.statPoints}</h4>
                </div>
                <StatBox statType='Strength' statModifier={this.props.statModifier} currStat={this.props.strengthStat} mod={'pwr'} statsLeft={this.props.statPoints}/>
                <StatBox statType='Speed' statModifier={this.props.statModifier} currStat={this.props.speedStat} mod={'spd'} statsLeft={this.props.statPoints}/>
                <StatBox statType='Defense' statModifier={this.props.statModifier} currStat={this.props.defenseStat} mod={'def'} statsLeft={this.props.statPoints}/>
                
            </div>
        )
    }

}   
const mapStateToProps = state => state

export default connect(mapStateToProps, {statModifier, levelUp})(CharacterBox);