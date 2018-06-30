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
            equipment: {
                head: 'empty',
                chest: 'empty',
                arms: 'empty',
                legs: 'empty',
                weapon: 'empty'
            }
        }

        this.equipItem = this.equipItem.bind(this)
    }
    
    equipItem(item) {
        if(item.type === 'weapon'){
            this.setState({equipment: {
                head: this.state.equipment.head,
                chest: this.state.equipment.chest,
                arms: this.state.equipment.arms,
                legs: this.state.equipment.legs,
                weapon: item}})
        }
        else if(item.type === 'legs'){
            this.setState({equipment: {
                head: this.state.equipment.head,
                chest: this.state.equipment.chest,
                arms: this.state.equipment.arms,
                legs: item,
                weapon: this.state.equipment.weapon}})
        }
        else if(item.type === 'arms'){
            this.setState({equipment: {
                head: this.state.equipment.head,
                chest: this.state.equipment.chest,
                arms: item,
                legs: this.state.equipment.legs,
                weapon: this.state.equipment.weapon}})
        }
        else if(item.type === 'chest'){
            this.setState({equipment: {
                head: this.state.equipment.head,
                chest: item,
                arms: this.state.equipment.arms,
                legs: this.state.equipment.legs,
                weapon: this.state.equipment.weapon}})
        }
        else if(item.type === 'head'){
            this.setState({equipment: {
                head: item,
                chest: this.state.equipment.chest,
                arms: this.state.equipment.arms,
                legs: this.state.equipment.legs,
                weapon: this.state.equipment.weapon}})
        }
    }
      

    render() {
        let strBuff = 0
            if(this.state.equipment.weapon !== 'empty'){
                strBuff += this.state.equipment.weapon.pwr
            }
            if(this.state.equipment.head !== 'empty'){
                strBuff += this.state.equipment.head.pwr
            }
            if(this.state.equipment.arms !== 'empty'){
                strBuff += this.state.equipment.arms.pwr
            }
            if(this.state.equipment.legs !== 'empty'){
                strBuff += this.state.equipment.legs.pwr
            }
            if(this.state.equipment.chest !== 'empty'){
                strBuff += this.state.equipment.chest.pwr
            }
        let trueStr = strBuff += this.props.strengthStat

            let spdBuff = 0
                if(this.state.equipment.weapon !== 'empty'){
                    spdBuff += this.state.equipment.weapon.spd
                }
                if(this.state.equipment.head !== 'empty'){
                    spdBuff += this.state.equipment.head.spd
                }
                if(this.state.equipment.arms !== 'empty'){
                    spdBuff += this.state.equipment.arms.spd
                }
                if(this.state.equipment.legs !== 'empty'){
                    spdBuff += this.state.equipment.legs.spd
                }
                if(this.state.equipment.chest !== 'empty'){
                    spdBuff += this.state.equipment.chest.spd
                }
            let trueSpd = spdBuff += this.props.speedStat

        let defBuff = 0
            if(this.state.equipment.weapon !== 'empty'){
                defBuff += this.state.equipment.weapon.def
            }
            if(this.state.equipment.head !== 'empty'){
                defBuff += this.state.equipment.head.def
            }
            if(this.state.equipment.arms !== 'empty'){
                defBuff += this.state.equipment.arms.def
            }
            if(this.state.equipment.legs !== 'empty'){
                defBuff += this.state.equipment.legs.def
            }
            if(this.state.equipment.chest !== 'empty'){
                defBuff += this.state.equipment.chest.def
            }
        let trueDef = defBuff += this.props.defenseStat

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
                <StatBox statType='Strength' statModifier={this.props.statModifier} currStat={trueStr} mod={'pwr'} statsLeft={this.props.statPoints}/>
                <StatBox statType='Speed' statModifier={this.props.statModifier} currStat={trueSpd} mod={'spd'} statsLeft={this.props.statPoints}/>
                <StatBox statType='Defense' statModifier={this.props.statModifier} currStat={trueDef} mod={'def'} statsLeft={this.props.statPoints}/>
                <h3>Equipment:</h3>
                <div className='equipment'>
                    <h4>Head</h4>
                    <h4>Chest</h4>
                    <h4>Arms</h4>
                    <h4>Legs</h4>
                    <h4>Weapon: {this.state.equipment.weapon.name}</h4>
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