import {FETCH_LOGIN, FETCH_LOGIN_ERROR,LOGOUT,GET_PROFILE,POST_PROFILE,AVATAR} from '../actions/types';

const initialState = {
    loginData:[]
}

export default function(state= initialState, action){
    switch(action.type){
        case FETCH_LOGIN:
            return {
                loginData:action.payload.data,
                status:action.payload.status
            }
            
        case FETCH_LOGIN_ERROR:
        return {
            error:action.payload.status,
            status:action.payload.status
        }
        case LOGOUT:
            return {
                loginData:[]
            }
        case "SESSION" :
        console.log(action.user)
        return {
            loginData:action.user,
        }
        break;
        default:
            return {
                ...state
            }
    }
}