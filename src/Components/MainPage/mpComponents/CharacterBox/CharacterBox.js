import React, { Component } from 'react';
// import axios from 'axios'

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './CharacterBox.css';

import StatBox from './cbComponents/StatBox/StatBox'
import Equipment from './cbComponents/equipment/equipment'
import Inventory from './cbComponents/Inventory/Inventory'

import {statModifier, beatMonster, levelUp} from '../../../../ducks/heroReducer'

import {attack} from '../../../../ducks/monsterReducer'


class CharacterBox extends Component {
    constructor(){
        super()
        this.state = {
            hero: null,
            equipment: null,
            invOpen: false
        }

        this.setHero = this.setHero.bind(this)
        this.attacking = this.attacking.bind(this)
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
    
    attacking(monster, hero, buffObj) {
        let power = hero.hero_str + buffObj.str - monster.defense
        let newHP = monster.HP -= power
        if(newHP <= 0) {
            this.props.beatMonster(monster, this.props.exp, this.props.gold)
            // this.props.getNewMon()
        } else {
            let newMon = Object.assign({}, monster, {HP: newHP})
            
            this.props.attack(newMon)
        }
        
    }

    openInventory() {
        this.setState({invOpen: !this.state.invOpen})
    }
      

    render() {
        let hero = this.props.currentHero

        let liveEquipment = 'Loading...'
        if(this.state.equipment) {
            liveEquipment = Object.keys(this.state.equipment).map(item => {
                return <Equipment type={item} equipObj={this.state.equipment[item]}/>
            })
        }

        let inventory = <h3>Empty</h3>
        if (this.props.currentInventory[0]){
            inventory = this.props.currentInventory.map(item => {
                return <Inventory item={item} equipment={this.state.equipment} remount={this.setHero}/>
            })}
        
        let buffs = {str: 0, def: 0, spd: 0}
        if(this.state.equipment) {
            Object.keys(this.state.equipment).map((item, index) => {
                buffs.str += this.state.equipment[item].pwr ? this.state.equipment[item].pwr : 0
                buffs.def += this.state.equipment[item].def ? this.state.equipment[item].def : 0
                buffs.spd += this.state.equipment[item].spd ? this.state.equipment[item].spd : 0
            }) 
        }

        return (
            
            <div className='charBox'>
                <div>
                    <h3>{hero ? hero.hero_name : 'nameless'}</h3>
                    <h4>Level: {this.props.level}</h4>
                    {this.props.exp >= this.props.nextLevel &&
                        <button onClick={() => this.props.levelUp(this.props.exp, this.props.level, this.props.nextLevel, this.props.currentHero)}>Level Up</button>
                    }
                    <h4>EXP: {this.props.exp}/{this.props.nextLevel}</h4>
                    <h4>Gold: {this.props.gold}</h4>
                    
                </div>
                {this.props.currentMonster && this.props.currentMonster.HP > 0 &&
                    <button onClick={() => this.attacking(this.props.currentMonster, this.state.hero, buffs)}>Attack!!</button>
                }
                {this.props.currentMonster && this.props.currentMonster.HP <= 0 &&
                    <div>
                        <button onClick={() => this.props.getNewMon()} >New Monster</button>
                    </div>
                }
                
                <h3>Extra Stats: {hero ? hero.extra_stats : 0}</h3>

                <StatBox statType='str' statModifier={this.setHero} buffs = {buffs} currStat={this.props.currentHero.hero_str} statsLeft={hero ? hero.extra_stats : 0}/>
                <StatBox statType='def' statModifier={this.setHero} buffs = {buffs} currStat={this.props.currentHero.hero_def} statsLeft={hero ? hero.extra_stats : 0}/>
                <StatBox statType='spd' statModifier={this.setHero} buffs = {buffs} currStat={this.props.currentHero.hero_spd} statsLeft={hero ? hero.extra_stats : 0}/>
                <h3>Equipment:</h3>
                {liveEquipment}
                
                <button onClick={() => this.openInventory()}>Inventory</button>
                {this.state.invOpen && 
                    <div className='inventory'>
                        {inventory}
                    </div>
                }
                
            </div>
        )
    }

}   
const mapStateToProps = state => ({...state.heroReducer, ...state.monsterReducer})

export default withRouter(connect(mapStateToProps, {statModifier, levelUp, attack, beatMonster, levelUp})(CharacterBox));