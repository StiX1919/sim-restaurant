import React, { Component } from 'react';
// import axios from 'axios'

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './CharacterBox.css';

import StatBox from './cbComponents/StatBox/StatBox'
import Equipment from './cbComponents/equipment/equipment'

import {
        levelUp,
        equipItem,
        attack} from '../../../../ducks/reducer'

import {
        statModifier,
        } from '../../../../ducks/heroReducer'


class CharacterBox extends Component {
    constructor(){
        super()
        this.state = {
            hero: null,
            equipment: null
        }

        this.setHero = this.setHero.bind(this)
        this.equipItem = this.equipItem.bind(this)
        this.attackButton = this.attackButton.bind(this)
    }
    componentDidMount() {
        this.setHero()
    }

    async setHero(hero, direction, statType) {
        try {
            await this.props.statModifier(hero, direction, statType)
            await this.setState({hero: this.props.currentHero, equipment: this.props.currentEquipment})
        } catch(err) {
            console.log(err)
        }
        
    }

    attackButton(HP, userStr, monDef, monStatus, monExp, currExp){
        console.log('teststats', HP, userStr, monDef, monStatus, monExp, currExp)
        this.props.attack(HP, userStr, monDef, monStatus, monExp, currExp)  
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
        let hero = this.state.hero

        let equipmentArr = null
        if(this.state.equipment){
            equipmentArr = Object.keys(this.state.equipment)
        }
        console.log(equipmentArr, 'equipment')
        // let strBuff = 0
        //     if(this.state.equipment.weapon !== 'empty'){
        //         strBuff += this.state.equipment.weapon.pwr
        //     }
        //     if(this.state.equipment.head !== 'empty'){
        //         strBuff += this.state.equipment.head.pwr
        //     }
        //     if(this.state.equipment.arms !== 'empty'){
        //         strBuff += this.state.equipment.arms.pwr
        //     }
        //     if(this.state.equipment.legs !== 'empty'){
        //         strBuff += this.state.equipment.legs.pwr
        //     }
        //     if(this.state.equipment.chest !== 'empty'){
        //         strBuff += this.state.equipment.chest.pwr
        //     }
        // let trueStr = strBuff += this.props.strengthStat

        //     let spdBuff = 0
        //         if(this.state.equipment.weapon !== 'empty'){
        //             spdBuff += this.state.equipment.weapon.spd
        //         }
        //         if(this.state.equipment.head !== 'empty'){
        //             spdBuff += this.state.equipment.head.spd
        //         }
        //         if(this.state.equipment.arms !== 'empty'){
        //             spdBuff += this.state.equipment.arms.spd
        //         }
        //         if(this.state.equipment.legs !== 'empty'){
        //             spdBuff += this.state.equipment.legs.spd
        //         }
        //         if(this.state.equipment.chest !== 'empty'){
        //             spdBuff += this.state.equipment.chest.spd
        //         }
        //     let trueSpd = spdBuff += this.props.speedStat

        // let defBuff = 0
        //     if(this.state.equipment.weapon !== 'empty'){
        //         defBuff += this.state.equipment.weapon.def
        //     }
        //     if(this.state.equipment.head !== 'empty'){
        //         defBuff += this.state.equipment.head.def
        //     }
        //     if(this.state.equipment.arms !== 'empty'){
        //         defBuff += this.state.equipment.arms.def
        //     }
        //     if(this.state.equipment.legs !== 'empty'){
        //         defBuff += this.state.equipment.legs.def
        //     }
        //     if(this.state.equipment.chest !== 'empty'){
        //         defBuff += this.state.equipment.chest.def
        //     }
        // let trueDef = defBuff += this.props.defenseStat

        let inventory = <h3>Empty</h3>
        if (this.props.currentInventory[0]){
            inventory = this.props.currentInventory.map(item => {
                return <div className="inventoryItems">
                    <h3>{item.name}</h3>
                    <button onClick={() => this.equipItem(item)}>Equip</button>
                    </div>
            })}
            {console.log(this.props.currentHero, 'heroPorps')}
        return (
            
            <div className='charBox'>
                <div>
                    <h3>{hero ? hero.hero_name : 'nameless'}</h3>
                    {/* <h4>Level: {this.props.level}</h4> */}
                    {/* {this.props.exp >= this.props.nextLevel &&
                        <button onClick={() => this.props.levelUp(this.props.exp, this.props.level, this.props.nextLevel, this.props.statPoints)}>Level Up</button>
                    }
                    <h4>EXP: {this.props.exp}/{this.props.nextLevel}</h4>
                    <h4>Available Stat Points: {this.props.statPoints}</h4> */}
                    
                </div>
                {/* {this.props.monsterStatus !== 'dead' &&
                    <button className="attackButtons" onClick={() => this.attackButton(this.props.monsterHP, 
                                                                                trueStr, 
                                                                                this.props.currentMonster.defense, 
                                                                                this.props.monsterStatus, 
                                                                                this.props.currentMonster.expValue,
                                                                                this.props.exp)}>Attack</button>
                } */}
                <h3>Extra Stats: {hero ? hero.extra_stats : 0}</h3>

                <StatBox statType='str' statModifier={this.setHero} currStat={this.props.currentHero.hero_str} statsLeft={hero ? hero.extra_stats : 0}/>
                <StatBox statType='def' statModifier={this.setHero} currStat={this.props.currentHero.hero_def} statsLeft={hero ? hero.extra_stats : 0}/>
                <StatBox statType='spd' statModifier={this.setHero} currStat={this.props.currentHero.hero_spd} statsLeft={hero ? hero.extra_stats : 0}/>
                <h3>Equipment:</h3>

                {equipmentArr && 
                    equipmentArr.map(item => {
                        return <Equipment type={item} equipObj={this.state.equipment}/>
                    })
                }
                
                <div className='inventory'>
                    {inventory}
                </div>
            </div>
        )
    }

}   
const mapStateToProps = state => ({...state.reducer, ...state.heroReducer})

export default withRouter(connect(mapStateToProps, {statModifier, levelUp, equipItem, attack})(CharacterBox));