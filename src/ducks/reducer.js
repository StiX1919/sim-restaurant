import axios from "axios";

//Action Constants
const TEST_RUN = "TEST_RUN"



//Initial State

const initialState = {
    testNum: 0
    
}


//Action Creators
export function runTest(num) {
    return {
        type: TEST_RUN,
        payload: num
    }
}





//Reducer

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case TEST_RUN:
        return Object.assign({}, state, {
            
            isLoading: false,
            testNum: action.payload
        })

        default:
            return state
    }

}