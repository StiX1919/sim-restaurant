import React, { Component } from 'react';
import axios from 'axios'

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './App.css';

import CharacterBox from './Components/CharacterBox/CharacterBox'
import MonsterBox from './Components/MonsterBox/MonsterBox'
import Shop from './Components/Shop/Shop'

import { getMonster,
          attack,
        } from './ducks/reducer'

class Character extends Component {
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
    axios.get('/api/preLogin').then(response => {
      console.log('response', response)
    })
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
    let inventory = <h3>Empty</h3>
    if (this.props.inventory[0]){
        inventory = this.props.inventory.map(item => {
            console.log(item,this.props.inventory)
            return <div className="inventoryItems">
                <h3>{item.name}</h3>
                <button onClick={() => this.equipItem(item)}>Equip</button>
                </div>
        })}
        {console.log(this.state.equipment, 'stuff')}


    return (
    <div className='page'>
      <div className="App">
        <CharacterBox />
        
        <div className="attacks">
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

const mapStateToProps = state => ({...state.reducer})

export default withRouter(connect(mapStateToProps, { getMonster, attack })(Character));