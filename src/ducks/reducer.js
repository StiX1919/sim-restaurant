import axios from "axios";

//Action Constants
const TEST_RUN = "TEST_RUN"

const GET_MONSTER = "GET_MONSTER"

const STAT_MODIFIER = "STAT_MODIFIER"


//Initial State

const initialState = {
    testNum: 0,
    // character info
    level: 1,
    exp: 0,
    nextLevel: 100,
    strengthStat: 2,
    speedStat: 2,
    defenseStat: 2,
    statPoints: 3,


    // monster info
    monsterStatus: 'alive',
    currentMonster: null,
    monsterHP: null


}


//Action Creators

export function getMonster() {
    return {
        type: GET_MONSTER,
        payload: axios.get('/api/getMonster').then(response => {
            console.log(response.data)
            return response.data
            // this.setState({currentMonster: response.data, currentMonsterHP: response.data.HP, monsterStatus: 'alive', exp: currExp})
            
          })
    }
    
  }

export function statModifier(direc, type, currStat, currPoints) {
    if(type === 'pwr'){
        let newStat = currStat
        let newPoints = currPoints
        if(direc === '+'){
            if(currPoints > 0){
                newStat += 1
                newPoints -= 1
              }
        }
        else {
            if(currStat > 2){
                newStat -= 1
                newPoints += 1
              }
        }
        let payload = {newStat, newPoints, type}
        console.log(payload)
        return {
            type: STAT_MODIFIER,
            payload: payload
        }
    }
    else if(type === 'spd') {
        let newStat = currStat
        let newPoints = currPoints
        if(direc === '+'){
            if(currPoints > 0){
                newStat += 1
                newPoints -= 1
              }
        }
        else {
            if(currStat > 2){
                newStat -= 1
                newPoints += 1
              }
        }
        let payload = {newStat, newPoints, type}
        return {
            type: STAT_MODIFIER,
            payload: payload
        }
    }
    else if(type === 'def') {
        let newStat = currStat
        let newPoints = currPoints
        if(direc === '+'){
            if(currPoints > 0){
                newStat += 1
                newPoints -= 1
              }
        }
        else {
            if(currStat > 2){
                newStat -= 1
                newPoints += 1
              }
        }
        let payload = {newStat, newPoints, type}
        return {
            type: STAT_MODIFIER,
            payload: payload
        }
    }
}





//Reducer

export default function reducer(state=initialState, action) {
    switch(action.type) {

        case GET_MONSTER + "_PENDING":
            return Object.assign({}, state, {
                isLoading: true
            });
        case GET_MONSTER + "_FULFILLED":
            return Object.assign({}, state, {
                isLoading: false,
                currentMonster: action.payload,
                monsterHP: action.payload.HP
            });

        case STAT_MODIFIER:
            if(action.payload.type === 'pwr') {
                return Object.assign({}, state, {
                    strengthStat: action.payload.newStat,
                    statPoints: action.payload.newPoints
                });
            }
            else if(action.payload.type === 'spd') {
                return Object.assign({}, state, {
                    speedStat: action.payload.newStat,
                    statPoints: action.payload.newPoints
                });
            }
            else if(action.payload.type === 'def') {
                return Object.assign({}, state, {
                    defenseStat: action.payload.newStat,
                    statPoints: action.payload.newPoints
                });
            }
        default:
            return state
    }

}