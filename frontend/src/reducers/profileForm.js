import { GET_PROFILE, POST_PROFILE, AVATAR } from '../actions/types';

const initialState = {
    profileForm: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "EDIT":
            return {
                profileForm: action.payload
            }

        default:
            return {
                ...state
            }
    }
}