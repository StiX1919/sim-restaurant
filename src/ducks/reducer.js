import axios from "axios";

//Action Constants
const TEST_RUN = "TEST_RUN"

const GET_MONSTER = "GET_MONSTER"


//Initial State

const initialState = {
    testNum: 0,
    // character info
    


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





//Reducer

export default function reducer(state=initialState, action) {
    switch(action.type) {

        case GET_MONSTER + "_PENDING":
        return Object.assign({}, state, {
            isLoading: true
        })
        case GET_MONSTER + "_FULFILLED":
        return Object.assign({}, state, {
            isLoading: false,
            currentMonster: action.payload,
            monsterHP: action.payload.HP
        })
        default:
            return state
    }

}