import React, {Component} from 'react'

import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import './CreateCharacter.css'

import {getClasses, getRaces, createNewHero} from '../../ducks/CCReducer'

class CreateCharacter extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            checkoutIndex: null,
            chosenRace: null,
            chosenType: null,
            chosenClass: null,
            str: null,
            def: null,
            spd: null
        }
        this.changeName = this.changeName.bind(this)
    }
    componentDidMount() {
        this.props.getRaces()
        this.props.getClasses()
    }

    changeName(input) {
        this.setState({name: input.target.value})
    }

    checkoutClass(index) {
        this.setState({checkoutIndex: index})
    }

    chooseClass(val) {
        this.setState({chosenClass: val.name, classID: val.id, str: val.base_str, def: val.base_def, spd: val.base_spd})
    }
    chooseRace(race) {
        this.setState({chosenRace: race})
    }
    chooseType(type, id) {
        this.setState({chosenType: type, typeId: id})
    }

    render() {
        let classes = (<h3>Loading...</h3>)
        if(this.props.classes[0]) {
            classes = this.props.classes.map((guy, ind) => {
                if(guy.race_type === this.state.chosenRace) {
                    return (
                        <div className='indClass' onClick={() => this.chooseClass(guy)}>
                            <img className='classImg' onMouseEnter={() => this.checkoutClass(ind)} src={guy.picture}/>
                            {this.state.checkoutIndex === ind && 
                                <div className='classInfo' onMouseLeave={() => this.checkoutClass(null)} >
                                    <h4>{guy.name}</h4>
                                    <div className='classStats' >
                                        <h5 style={{color: 'red'}}>Str: {guy.base_str}</h5>
                                        <h5 style={{color: 'blue'}}>Def: {guy.base_def}</h5>
                                        <h5 style={{color: 'green'}}>Spd: {guy.base_spd}</h5>
                                    </div>
                                </div>
                            }
                            
                        </div>
                    );
                }
                
            });
        }

        let raceTypes = ["Humanity", 
                        // "Demi-Humans", 
                        // "Monsters"
                        ]

        const raceButtons = raceTypes.map(race => {
            return (
                <div>
                    <button onClick={() => this.chooseRace(race)}>{race}</button>
                </div>
            )
        })
        let raceCards = (<h4>Choose a Race Type.</h4>)
        if(this.state.chosenRace !== null) {
            raceCards = this.props.races.map((race, ind) => {
                if(race.type === this.state.chosenRace){
                    return (
                        <button onClick={() => this.chooseType(race.name, race.id)}>{race.name}</button>
                    )
                }
                
            })
        }
        console.log('user on props', this.props.user)

        
        

        return (
            <div className='hero_Creation_Component'>
                <div>
                    <h1>Create a New Hero</h1>
                    <div className='hero_Creation_Box'>
                        <h3>Hero Name</h3>
                        <input value={this.state.name} placeholder={'ex: Lord Farquad'}onChange={e => this.changeName(e)}/>
                        <div>
                            <h3>Choose Starting Race</h3>
                            <div className='raceButtonHolder'>
                                {raceButtons}
                            </div>
                            <div className='raceCardHolder'>
                                {raceCards}
                            </div>
                        </div>
                        <div>
                            <h3>Choose Starting Class</h3>
                            <div className='classes'>{classes}</div>
                        
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Name: {this.state.name}</h2>
                    <h2>Race: {this.state.chosenRace}</h2>
                    <h2>Type: {this.state.chosenType}</h2>
                    <h2>Class: {this.state.chosenClass}</h2>
                    <h4>Str: {this.state.str}</h4>
                    <h4>Def: {this.state.def}</h4>
                    <h4>Spd: {this.state.spd}</h4>
                    {this.state.name && this.state.chosenClass && this.state.chosenType &&
                        <button onClick={() => this.props.createNewHero({name: this.state.name,
                                                                        race: this.state.typeId,
                                                                        class: this.state.classID,
                                                                        str: this.state.str,
                                                                        def: this.state.def,
                                                                        spd: this.state.spd,
                                                                        userId: this.props.user
                                                                        })}>
                                                                        Create New Hero</button>
                    }
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({...state.CCReducer, ...state.userReducer})

export default withRouter(connect(mapStateToProps, {getClasses, getRaces, createNewHero})(CreateCharacter))
