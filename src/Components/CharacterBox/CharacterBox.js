import React, { Component } from 'react';
import axios from 'axios'

import {connect} from 'react-redux'
import './CharacterBox.css';

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

        this.strengthStatUp = this.strengthStatUp.bind(this)
        this.strengthStatDown = this.strengthStatDown.bind(this)
    
        this.speedStatUp = this.speedStatUp.bind(this)
        this.speedStatDown = this.speedStatDown.bind(this)
    
        this.defenseStatUp = this.defenseStatUp.bind(this)
        this.defenseStatDown = this.defenseStatDown.bind(this)
    

    }

    strengthStatUp(){
        let oldStat = this.state.strengthStat
        let oldPoints = this.state.statPoints
    
        if(this.state.statPoints > 0){
          oldStat += 1
          oldPoints -= 1
        }
        this.setState({strengthStat: oldStat, statPoints: oldPoints})
      }
      strengthStatDown(){
        let oldStat = this.state.strengthStat
        let oldPoints = this.state.statPoints
    
        if(oldStat > 2){
          oldStat -= 1
          oldPoints += 1
        }
        this.setState({strengthStat: oldStat, statPoints: oldPoints})
      }
    
      speedStatUp(){
        let oldStat = this.state.speedStat
        let oldPoints = this.state.statPoints
    
        if(this.state.statPoints > 0){
          oldStat += 1
          oldPoints -= 1
        }
        this.setState({speedStat: oldStat, statPoints: oldPoints})
      }
      speedStatDown(){
        let oldStat = this.state.speedStat
        let oldPoints = this.state.statPoints
    
        if(oldStat > 2){
          oldStat -= 1
          oldPoints += 1
        }
        this.setState({speedStat: oldStat, statPoints: oldPoints})
      }
    
      defenseStatUp(){
        let oldStat = this.state.defenseStat
        let oldPoints = this.state.statPoints
    
        if(this.state.statPoints > 0){
          oldStat += 1
          oldPoints -= 1
        }
        this.setState({defenseStat: oldStat, statPoints: oldPoints})
      }
      defenseStatDown(){
        let oldStat = this.state.defenseStat
        let oldPoints = this.state.statPoints
    
        if(oldStat > 2){
          oldStat -= 1
          oldPoints += 1
        }
        this.setState({defenseStat: oldStat, statPoints: oldPoints})
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
                    <h4>Level: {this.props.level}</h4>
                    <h4>EXP: {this.state.exp}/{this.state.nextLevel}</h4>
                </div>
  
                <div>
                    <h4>Available Stat Points</h4>
                    <h4>{this.state.statPoints}</h4>
                    <h4>strength</h4>
                    <button onClick={() => this.strengthStatDown()}>-1</button>
                    {this.state.strengthStat}
                    <button onClick={() => this.strengthStatUp()}>+1</button>
                </div>
                <div>
                    <h4>speed</h4>
                    <button onClick={() => this.speedStatDown()}></button>
                    {this.state.speedStat}
                    <button onClick={() => this.speedStatUp()}></button>
                </div>
                <div>
                    <h4>defense</h4>
                    <button onClick={() => this.defenseStatDown()}></button>
                    {this.state.defenseStat}
                    <button onClick={() => this.defenseStatUp()}></button>
                </div>
            </div>
        )
    }

}   
const mapStateToProps = state => state

export default connect(mapStateToProps, {})(CharacterBox);