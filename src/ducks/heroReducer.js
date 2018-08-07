import axios from "axios";


//Action Constants

const SELECT_HERO = "SELECT_HERO"

const STAT_MODIFIER = "STAT_MODIFIER"

const GET_SHOP = 'GET_SHOP'
const PURCHASE_ITEM = "PURCHASE_ITEM"

const EQUIP_GEAR = 'EQUIP_GEAR'

//Initial State

const initialState = {
    testNum: 0,
    currentHero: null,
    currentEquipment: {
        head: 'empty',
        chest: 'empty',
        arms: 'empty',
        legs: 'empty',
        weapon: 'empty'
    },
    currentInventory: [],
    gold: 100
}


//Action Creators

export function equipGear(item, CE) {
    let newObj = CE
    newObj[item.type] = item
    console.log(newObj, 'testData')
    return {
        type: EQUIP_GEAR,
        payload: newObj
    }
}

export function selectHero(hero) {
    console.log('gotHero', hero)
    return {
        type: SELECT_HERO,
        payload: hero
    }
    
}

export function getShop() {
    return {
        type: GET_SHOP,
        payload: axios.get('/api/getShop').then(response => {
            console.log(response.data)
            return response.data
        })
    }
}

export function purchaseItem(item, oldInv, cost, oldGold) {
    console.log(item, oldInv, cost)
    let newInv = oldInv
    let newGold = oldGold

    newInv.push(item)
    newGold -= cost
    return {
        type: PURCHASE_ITEM,
        payload: {newInv, newGold}
    }
}

export function statModifier(hero, direction, statType) {
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

        case GET_SHOP + "_PENDING":
            return Object.assign({}, state, {
                isLoading: true
            });
        case GET_SHOP + "_FULFILLED":
            return Object.assign({}, state, {
                isLoading: false,
                shopItems: action.payload
            });

        case PURCHASE_ITEM:
            return Object.assign({}, state, {
                currentInventory: action.payload.newInv,
                gold: action.payload.newGold
            })

        case EQUIP_GEAR:
            return {
                ...state,
                currentEquipment: action.payload
            }

        default:
            return state
    }

}