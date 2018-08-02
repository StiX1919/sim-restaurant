import React, {Component} from 'react'

import axios from 'axios'

import {connect} from 'react-redux'


import './CCC.css'

class CCC extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const hero = this.props.hero
        return(
            <div className='hero_card'>
                <img className='hero_img' src={hero.picture}/>
                <div>
                    <h3>{hero.hero_name}</h3>
                    <h4>{hero.name}</h4>
                    <h5>Str:{hero.hero_str}</h5>
                    <h5>Def:{hero.hero_def}</h5>
                    <h5>Spd:{hero.hero_spd}</h5>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({...state.reducer, ...state.userReducer})

export default connect(mapStateToProps)(CCC);