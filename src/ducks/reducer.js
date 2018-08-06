import axios from "axios";


//Action Constants

const GET_MONSTER = "GET_MONSTER"


const LEVEL_UP = "LEVEL_UP"
// const STAT_MODIFIER = "STAT_MODIFIER"

const ATTACKING = "ATTACKING"


const EQUIP = 'EQUIP'

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

export function equipItem(item) {
    console.log(item)
    return {
        type: EQUIP,
        payload: item
    }
}


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

        case GET_MONSTER + "_PENDING":
            return Object.assign({}, state, {
                isLoading: true
            });
        case GET_MONSTER + "_FULFILLED":
            return Object.assign({}, state, {
                isLoading: false,
                currentMonster: action.payload,
                monsterHP: action.payload.HP,
                monsterStatus: 'alive'
            });

        case LEVEL_UP: {
            return Object.assign({}, state, {
                level: action.payload.newLevel,
                exp: action.payload.newExp,
                nextLevel: action.payload.newNextLevel,
                statPoints: action.payload.newPoint
            })
        }
        // case STAT_MODIFIER:
        //     if(action.payload.type === 'pwr') {
        //         return Object.assign({}, state, {
        //             strengthStat: action.payload.newStat,
        //             statPoints: action.payload.newPoints
        //         });
        //     }
        //     else if(action.payload.type === 'spd') {
        //         return Object.assign({}, state, {
        //             speedStat: action.payload.newStat,
        //             statPoints: action.payload.newPoints
        //         });
        //     }
        //     else if(action.payload.type === 'def') {
        //         return Object.assign({}, state, {
        //             defenseStat: action.payload.newStat,
        //             statPoints: action.payload.newPoints
        //         });
        //     } else break
        case ATTACKING:
            return Object.assign({}, state, {
                monsterHP: action.payload.currMonsterHP,
                monsterStatus: action.payload.newStatus,
                exp: action.payload.exp
            });
        
        case EQUIP:
            if(action.payload.type === 'weapon'){
                return Object.assign({}, state, {
                    equipment:{weapon: action.payload.name}
                })
            }
            else if(action.payload.type === 'head'){
                return Object.assign({}, state, {
                    head: action.payload.name
                })
            }
            else if(action.payload.type === 'arms'){
                return Object.assign({}, state, {
                    arms: action.payload.name
                })
            }
            else if(action.payload.type === 'legs'){
                return Object.assign({}, state, {
                    legs: action.payload.name
                })
            }
            else if(action.payload.type === 'chest'){
                return Object.assign({}, state, {
                    equipment:{chest: action.payload.name}
                })
            }
            

        default:
            return state
    }

}