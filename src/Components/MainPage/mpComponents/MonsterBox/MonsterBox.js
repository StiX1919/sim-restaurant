import React, { Component } from 'react';
// import axios from 'axios'

import {connect} from 'react-redux'
import './MonsterBox.css';

class MonsterBox extends Component {
    constructor(){
        super()
        this.state = {

        }
        this.setMon = this.setMon.bind(this)

    }
    componentDidMount() {
        this.setMon()
    }
    async setMon() {
        if(!this.state.monster){
            try {
                await this.setState({monster: this.props.currentMonster})
            } catch(err) {
                console.log(err)
            }
            if(!this.state.monster){
                this.setMon()
            }
        } else if (this.state.monster !== this.props.currentMonster){
            this.setState({monster: this.props.currentMonster})
        }
        
        
    }
    // shouldComponentUpdate(){
    //     return this.state.monster === this.props.currentMonster
    // }
    

    render() {
        this.setMon()
        console.log(this.state.monster, 'monbox', this.props.currentMonster)
        return (
            <div>
                {this.state.monster &&
                <div className='mainBox'>
                    <h2>{this.state.monster.name}</h2>
                    <img className='monsterImg' src={this.state.monster.image} alt=''/>
                    <h4>{this.state.monster.description}</h4>
                    <h4>Current HP: {this.state.monster.HP}</h4>
                </div>
                }
            </div>
        )
    }

}   
const mapStateToProps = state => ({...state.monsterReducer})

export default connect(mapStateToProps, {})(MonsterBox);