import {GET_PROFILE,POST_PROFILE,AVATAR} from '../actions/types';

const initialState = {
    profileData:[]
}

export default function(state= initialState, action){
    switch(action.type){
        case GET_PROFILE:
            return {
                profileData:action.payload.data,
                status:action.payload.status
            }
            
        default:
            return {
                ...state
            }
    }
}