import axios from "axios";


//Action Constants

const SELECT_HERO = "SELECT_HERO"

const STAT_MODIFIER = "STAT_MODIFIER"



//Initial State

const initialState = {
    testNum: 0,
    currentHero: null
    
}


//Action Creators

export function selectHero(hero) {
    console.log('gotHero', hero)
    return {
        type: SELECT_HERO,
        payload: hero
    }
}

export function statModifier(hero, direction, statType) {
    console.log('statmodstuff', hero, direction, statType)
    let modHero = hero
    if(direction === '+') {
        if(statType === 'str') {
            modHero.hero_str++
            modHero.extra_stats--
        }
        if(statType === 'def') {
            modHero.hero_def ++
            modHero.extra_stats--
        }
        if(statType === 'spd') {
            modHero.hero_spd++
            modHero.extra_stats--
        }
    }

    return {
        type: STAT_MODIFIER,
        payload: modHero
    }
    
}



//Reducer

export default function heroReducer(state=initialState, action) {
    switch(action.type) {
        case SELECT_HERO:
            return {
                ...state,
                currentHero: action.payload
            }
        case STAT_MODIFIER + '_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case STAT_MODIFIER + '_FULFILLED':
            return {
                ...state,
                isLoading: false,
                currentHero: action.payload
            }

        default:
            return state
    }

}