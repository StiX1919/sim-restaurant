import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'

import {connect} from 'react-redux'
import './App.css';

import CharacterBox from './Components/CharacterBox/CharacterBox'
import MonsterBox from './Components/MonsterBox/MonsterBox'

import { getMonster,
        } from './ducks/reducer'


class App extends Component {
  constructor(props) {
    super()
    this.state = {
      
    }

    this.attackButton = this.attackButton.bind(this)
  }

  componentDidMount() {
    this.props.getMonster()
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
          <CharacterBox />
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

        </div>
        

      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getMonster })(App);