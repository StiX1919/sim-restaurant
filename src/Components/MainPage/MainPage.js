import React, { Component } from 'react';
import axios from 'axios'

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './MainPage.css';

import CharacterBox from './mpComponents/CharacterBox/CharacterBox'
import MonsterBox from './mpComponents/MonsterBox/MonsterBox'
import Shop from './mpComponents/Shop/Shop'

import { attack } from '../../ducks/reducer'

import {getMonster} from '../../ducks/monsterReducer'

class MainPage extends Component {
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
    let inventory = <h3>Empty</h3>
    if (this.props.currentInventory[0]){
        inventory = this.props.currentInventory.map(item => {
            console.log(item,this.props.inventory)
            return <div className="inventoryItems">
                <h3>{item.name}</h3>
                <button onClick={() => this.equipItem(item)}>Equip</button>
                </div>
        })}
        {console.log(this.props.currentHero, 'top hero pors')}


    return (
    <div className='page'>
      <div className="App">
        <CharacterBox getNewMon={this.props.getMonster}/>
        
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

const mapStateToProps = state => ({...state.reducer, ...state.heroReducer, ...state.monsterReducer})

export default withRouter(connect(mapStateToProps, { getMonster, attack })(MainPage));