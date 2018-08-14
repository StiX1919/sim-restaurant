import React, { Component } from 'react';
import axios from 'axios'

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './MainPage.css';

import CharacterBox from './mpComponents/CharacterBox/CharacterBox'
import MonsterBox from './mpComponents/MonsterBox/MonsterBox'
import Shop from './mpComponents/Shop/Shop'

import {getMonster} from '../../ducks/monsterReducer'

class MainPage extends Component {
  constructor(props) {
    super()
    this.state = {
      shop: false
    }
    this.openShop = this.openShop.bind(this)

  }

  componentDidMount() {
    this.props.getMonster()
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
          {this.props.currentMonster && this.props.currentMonster.HP <= 0 &&
            <div>
              <h2>Monster is Dead!</h2>
              <button onClick={() => this.props.getMonster()} >New Monster</button>
            </div>
          }
        </div>


        <div>
          {this.props.currentMonster && this.props.currentMonster.HP > 0 && <MonsterBox />}
          
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

const mapStateToProps = state => ({...state.heroReducer, ...state.monsterReducer})

export default withRouter(connect(mapStateToProps, { getMonster})(MainPage));