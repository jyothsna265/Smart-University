import {GET_PROFILE,POST_PROFILE,AVATAR} from '../actions/types';

const initialState = {
    applyForm:[]
}

export default function(state= initialState, action){
    switch(action.type){
        case "APPLY":
            return {
                applyForm:action.payload
            }
            
        default:
            return {
                ...state
            }
    }
}