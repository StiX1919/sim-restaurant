import React, { Component } from 'react';
// import axios from 'axios'

import {connect} from 'react-redux'
import './CharacterBox.css';

import StatBox from '../StatBox/StatBox'

import {statModifier,
        levelUp,
        equipItem} from '../../ducks/reducer'

class CharacterBox extends Component {
    constructor(){
        super()
        this.state = {
            
        }


    }
    

      

    render() {
        let inventory = <h3>Empty</h3>
        if (this.props.inventory[0]){
            inventory = this.props.inventory.map(item => {
                console.log(item,this.props.inventory)
                return <div className="inventoryItems">
                    <h3>{item.name}</h3>
                    <button onClick={() => this.props.equipItem(item)}>Equip</button>
                    </div>
            })}
        return (
            <div className='mainBox'>
                <h1>Create Your Character</h1>
                <div>
                    <h3>Character Name</h3>
                    <input />
                    <h3>Gold: {this.props.gold}</h3>
                    <h4>Level: {this.props.level}</h4>
                    {this.props.exp >= this.props.nextLevel &&
                        <button onClick={() => this.props.levelUp(this.props.exp, this.props.level, this.props.nextLevel, this.props.statPoints)}>Level Up</button>
                    }
                    <h4>EXP: {this.props.exp}/{this.props.nextLevel}</h4>
                    <h4>Available Stat Points: {this.props.statPoints}</h4>
                    
                </div>
                <StatBox statType='Strength' statModifier={this.props.statModifier} currStat={this.props.strengthStat} mod={'pwr'} statsLeft={this.props.statPoints}/>
                <StatBox statType='Speed' statModifier={this.props.statModifier} currStat={this.props.speedStat} mod={'spd'} statsLeft={this.props.statPoints}/>
                <StatBox statType='Defense' statModifier={this.props.statModifier} currStat={this.props.defenseStat} mod={'def'} statsLeft={this.props.statPoints}/>
                <h3>Equipment:</h3>
                <div className='equipment'>
                    <h4>Head</h4>
                    <h4>Chest</h4>
                    <h4>Arms</h4>
                    <h4>Legs</h4>
                    <h4>Weapon: {this.props.weapon}</h4>
                </div>
                <div>
                    {inventory}
                </div>
            </div>
        )
    }

}   
const mapStateToProps = state => state

export default connect(mapStateToProps, {statModifier, levelUp, equipItem})(CharacterBox);