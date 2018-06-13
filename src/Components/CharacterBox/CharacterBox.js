import React, { Component } from 'react';
import axios from 'axios'

import {connect} from 'react-redux'
import './CharacterBox.css';

import StatBox from '../StatBox/StatBox'

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

        this.statModifier = this.statModifier.bind(this)


    }

    statModifier(direc, type){
        if(type === 'pwr'){
            let oldStat = this.state.strengthStat
            let oldPoints = this.state.statPoints
            if(direc === '+'){
                if(this.state.statPoints > 0){
                    oldStat += 1
                    oldPoints -= 1
                  }
            }
            else {
                if(oldStat > 2){
                    oldStat -= 1
                    oldPoints += 1
                  }
            }
            
            this.setState({strengthStat: oldStat, statPoints: oldPoints})
        }
        else if(type === 'spd') {
            let oldStat = this.state.speedStat
            let oldPoints = this.state.statPoints
            if(direc === '+'){
                if(this.state.statPoints > 0){
                    oldStat += 1
                    oldPoints -= 1
                  }
            }
            else {
                if(oldStat > 2){
                    oldStat -= 1
                    oldPoints += 1
                  }
            }
            
            this.setState({speedStat: oldStat, statPoints: oldPoints})
        }
        else if(type === 'def') {
            let oldStat = this.state.defenseStat
            let oldPoints = this.state.statPoints
            if(direc === '+'){
                if(this.state.statPoints > 0){
                    oldStat += 1
                    oldPoints -= 1
                  }
            }
            else {
                if(oldStat > 2){
                    oldStat -= 1
                    oldPoints += 1
                  }
            }
            
            this.setState({defenseStat: oldStat, statPoints: oldPoints})
        }
      }
      

    render() {
        return (
            <div>
                <h1>Create Your Character</h1>
                <div>
                    <h3>Character Name</h3>
                    <input />
                    <h3>Job</h3>
                    <input />
                    <h4>Level: {this.state.level}</h4>
                    <h4>EXP: {this.state.exp}/{this.state.nextLevel}</h4>
                    <h4>Available Stat Points</h4>
                    <h4>{this.state.statPoints}</h4>
                </div>
                <StatBox statType='Strength' statModifier={this.statModifier} currStat={this.state.strengthStat} mod={'pwr'} statsLeft={this.state.statPoints}/>
                <StatBox statType='Speed' statModifier={this.statModifier} currStat={this.state.speedStat} mod={'spd'} statsLeft={this.state.statPoints}/>
                <StatBox statType='Defense' statModifier={this.statModifier} currStat={this.state.defenseStat} mod={'def'} statsLeft={this.state.statPoints}/>
                
            </div>
        )
    }

}   
const mapStateToProps = state => state

export default connect(mapStateToProps, {})(CharacterBox);