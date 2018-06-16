import React, { Component } from 'react';
// import axios from 'axios'

import {connect} from 'react-redux'
import './App.css';

import CharacterBox from './Components/CharacterBox/CharacterBox'
import MonsterBox from './Components/MonsterBox/MonsterBox'

import { getMonster,
          attack,
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
 


  

  attackButton(HP, userStr, monDef, monStatus, monExp, currExp){
    console.log('teststats', HP, userStr, monDef, monStatus, monExp, currExp)
    this.props.attack(HP, userStr, monDef, monStatus, monExp, currExp)

    
    // let currMonsterHP = this.props.monsterHP

    // let damage = this.props.strengthStat - this.props.currentMonster.defense
    // if(this.props.monsterStatus != 'dead'){
    //   if(damage > 0){
    //     currMonsterHP = currMonsterHP - damage
    //     if(currMonsterHP <= 0){
  
    //       this.setState({currentMonsterHp: currMonsterHP, monsterStatus: 'dead'})
    //       setTimeout(this.getMonster, 2000)
    //     }
    //     this.setState({currentMonsterHP: currMonsterHP})
    //   }
      
    //   console.log('currMonsterHP', currMonsterHP, damage)
    // }

    
  }

  render() {


    return (
      <div className="App">
        <CharacterBox />
        
        <div className="attacks">
          {this.props.monsterStatus !== 'dead' &&
            <button className="attackButtons" onClick={() => this.attackButton(this.props.monsterHP, 
                                                                                this.props.strengthStat, 
                                                                                this.props.currentMonster.defense, 
                                                                                this.props.monsterStatus, 
                                                                                this.props.currentMonster.expValue,
                                                                                this.props.exp)}>Attack</button>
          }
          {this.props.monsterStatus === 'dead' &&
            <button onClick={() => this.props.getMonster()} >New Monster</button>
          }
        </div>


        <div>
          {this.props.currentMonster && this.props.monsterStatus !== 'dead' && <MonsterBox />}
          {this.props.monsterStatus === 'dead' && <h2>Monster is Dead!</h2>}
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getMonster, attack })(App);