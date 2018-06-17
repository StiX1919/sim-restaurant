import React, { Component } from 'react';
// import axios from 'axios'

import {connect} from 'react-redux'
import './App.css';

import CharacterBox from './Components/CharacterBox/CharacterBox'
import MonsterBox from './Components/MonsterBox/MonsterBox'
import Shop from './Components/Shop/Shop'

import { getMonster,
          attack,
        } from './ducks/reducer'

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      shop: false
    }

    this.attackButton = this.attackButton.bind(this)
    this.openShop = this.openShop.bind(this)

  }

  componentDidMount() {
    this.props.getMonster()
  }
 


  

  attackButton(HP, userStr, monDef, monStatus, monExp, currExp){
    console.log('teststats', HP, userStr, monDef, monStatus, monExp, currExp)
    this.props.attack(HP, userStr, monDef, monStatus, monExp, currExp)  
  }

  openShop() {
    if(this.state.shop === true){
      this.setState({shop: false})
    } else this.setState({shop: true})
  }

  render() {


    return (
    <div className='page'>
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
      <div className='shop'>
        <button onClick={this.openShop}>Shop</button>
        {this.state.shop === true &&
          <Shop />
        }
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getMonster, attack })(App);