import axios from "axios";


//Action Constants


const LEVEL_UP = "LEVEL_UP"
// const STAT_MODIFIER = "STAT_MODIFIER"

const ATTACKING = "ATTACKING"



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
    gold: 100,


    // monster info
    monsterStatus: 'alive',
    currentMonster: null,
    monsterHP: null,
    
}


//Action Creators


export function levelUp(exp, level, nextLevel, currPoints){
    
    let newLevel = level += 1

    let nextLevelMod = 1 + newLevel/10

    let newExp = exp - nextLevel
    let newNextLevel = Math.floor(nextLevel * nextLevelMod)
    let newPoint = currPoints += 1

    return {
        type: LEVEL_UP,
        payload: {
            newLevel, newExp, newNextLevel, newPoint
        }
    }
}



export function attack(HP, userStr, monDef, monStatus, monExp, currExp) {
    let currMonsterHP = HP
    
    let damage = userStr - monDef
    let newExp = currExp + monExp
    if(monStatus !== 'dead'){
        if(damage > 0){
            currMonsterHP = currMonsterHP - damage
            if(currMonsterHP <= 0){
      
                return {
                    type: ATTACKING,
                    payload: {currMonsterHP, newStatus: 'dead', exp: newExp}
                }
            }
            return {
                type: ATTACKING,
                payload: {currMonsterHP, newStatus: 'alive', exp: currExp}
            }
          }
          return {
            type: ATTACKING,
            payload: {currMonsterHP: HP, newStatus: 'alive', exp: currExp}
          }
        }
    
        
}




//Reducer

export default function reducer(state=initialState, action) {
    switch(action.type) {

        case LEVEL_UP: {
            return Object.assign({}, state, {
                level: action.payload.newLevel,
                exp: action.payload.newExp,
                nextLevel: action.payload.newNextLevel,
                statPoints: action.payload.newPoint
            })
        }
        case ATTACKING:
            return Object.assign({}, state, {
                monsterHP: action.payload.currMonsterHP,
                monsterStatus: action.payload.newStatus,
                exp: action.payload.exp
            });
 
            

        default:
            return state
    }

}