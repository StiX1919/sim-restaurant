import axios from "axios";


//Action Constants

const GET_CLASSES = "GET_CLASSES"
const GET_RACES = "GET_RACES"


//Initial State

const initialState = {
    testNum: 0,
    classes: [],
    races: [],
    isLoading: false
    
}


//Action Creators

export function getClasses() {
    return {
        type: GET_CLASSES,
        payload: axios.get('/api/getClasses')
    }
}

export function getRaces() {
    return {
        type: GET_RACES,
        payload: axios.get('/api/getRaces')
    }
}





//Reducer

export default function CCReducer(state=initialState, action) {
    switch(action.type) {
        case GET_CLASSES + "_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case GET_CLASSES + "_FULFILLED":
            console.log('payload', action.payload)
            return {
                ...state,
                isLoading: false,
                classes: action.payload.data
            }
        case GET_RACES + "_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case GET_RACES + "_FULFILLED":
            console.log('payload', action.payload)
            return {
                ...state,
                isLoading: false,
                races: action.payload.data
            }
        
        
            

        default:
            return state
    }

}