import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'

import {connect} from 'react-redux'
import './App.css';

import MonsterBox from './Components/MonsterBox/MonsterBox'

import { runTest,
          getMonster
        } from './ducks/reducer'


class App extends Component {
  constructor(props) {
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

    this.attackButton = this.attackButton.bind(this)
  }

  componentDidMount() {
    this.props.getMonster()
  }


  addFoodToList() {
    if(this.state.newFoodItem && this.state.newFoodPrice && this.state.newFoodDescription){
      axios.post('/api/addNewFoodToList', {name: this.state.newFoodItem,
        price: this.state.newFoodPrice,
        description: this.state.newFoodDescription}).then(response => {
          this.setState({foodInfo: response.data, newFoodItem: '', newFoodPrice: '', newFoodDescription: ''})
        })
    }
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

  attackButton(){
    let currMonsterHP = this.state.currentMonsterHP

    let damage = this.state.strengthStat - this.state.currentMonster.defense
    if(this.state.monsterStatus != 'dead'){
      if(damage > 0){
        currMonsterHP = currMonsterHP - damage
        if(currMonsterHP <= 0){
  
          this.setState({currentMonsterHp: currMonsterHP, monsterStatus: 'dead'})
          setTimeout(this.getMonster, 2000)
        }
        this.setState({currentMonsterHP: currMonsterHP})
      }
      
      console.log('currMonsterHP', currMonsterHP, damage)
    }

    
  }

  render() {


    return (
      <div className="App">
        <div className='characterBox'>
          <h1>Create Your Character</h1>
          <div>
            <h3>Character Name</h3>
            <input />
            <h3>Job</h3>
            <input />
            <h4>Level: {this.state.level}</h4>
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

        <div className="attacks">
          <button className="attackButtons" onClick={() => this.attackButton()}>Attack</button>
          <button className="attackButtons" onClick={() => this.attackButton()}>Defend</button>
          <button className="attackButtons" onClick={() => this.attackButton()}>Spells</button>
          <button className="attackButtons" onClick={() => this.attackButton()}>Skills</button>
        </div>

        <div className='characterBox'>
          {this.props.currentMonster && this.props.monsterStatus != 'dead' && <MonsterBox />}
          {this.props.monsterStatus === 'dead' && <h2>Monster is Dead!</h2>}
          {this.props.testNum}

          
          <button onClick={() => this.props.runTest(1)}>+1</button>
          <button onClick={() => this.props.runTest(2)}>+2</button>
        </div>
        

      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {runTest, getMonster})(App);