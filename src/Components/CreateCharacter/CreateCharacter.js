import React, {Component} from 'react'

import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import './CreateCharacter.css'

import {getClasses, getRaces} from '../../ducks/CCReducer'

class CreateCharacter extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            checkoutIndex: null,
            chosenRace: null

        }
        this.changeName = this.changeName.bind(this)
    }
    componentDidMount() {
        this.props.getRaces()
        this.props.getClasses()
    }

    changeName(input) {
        this.setState({name: input.input.value})
    }

    checkoutClass(index) {
        this.setState({checkoutIndex: index})
    }

    chooseRaceType(race) {
        this.setState({chosenRace: race})
    }

    render() {
        let classes = (<h3>Loading...</h3>)
        if(this.props.classes[0]) {
            classes = this.props.classes.map((guy, ind) => {
                return (
                    <div className='indClass'>
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
            });
        }

        let raceTypes = ["Humanity", "Demi-Humans", "Monsters"]

        const raceButtons = raceTypes.map(race => {
            return (
                <div>
                    <button onClick={() => this.chooseRaceType(race)}>{race}</button>
                </div>
            )
        })
        let raceCards = (<h4>Choose a Race Type.</h4>)
        if(this.state.chosenRace !== null) {
            raceCards = this.props.races.map((race, ind) => {
                if(race.type === this.state.chosenRace){
                    return (
                        <div>
                            <h3>{race.name}</h3>
                        </div>
                    )
                }
                
            })
        }

        
        

        return (
            <div>
                <h1>Create a New Hero</h1>
                <div className='hero_Creation_Box'>
                    <h3>Hero Name</h3>
                    <input value={this.state.name} placeholder={'ex: Lord Farquad'}onChange={e => this.changeName(e)}/>
                    <div>
                        <h3>Choose Starting Race</h3>
                        {raceButtons}
                        {raceCards}
                    </div>
                    <div>
                        <h3>Choose Starting Class</h3>
                        <div className='classes'>{classes}</div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({...state.CCReducer})

export default withRouter(connect(mapStateToProps, {getClasses, getRaces})(CreateCharacter))
