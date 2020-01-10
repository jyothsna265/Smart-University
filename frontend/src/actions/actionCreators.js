

var type = require('./types');

export const fetchLogin = (data) => {

    return {
        type: type.FETCH_LOGIN,
        payload: data
    }
}

export const sessionAction = (data) => {

    return {
        type: type.SESSION,
        user: data
    }
}

export const logout = (data) => {
    return {
        type: type.LOGOUT,
        payload: data
    }

}

export const updateProfile = (data) => {

    return {
        type: type.GET_PROFILE,
        payload: data
    }
}

export const jobDetails = (data) => {

    return {
        type: "JOB",
        payload: data
    }
}

export const applyForm = (data) => {

    return {
        type: "APPLY",
        payload: data
    }
}


export const profileForm = (data) => {

    return {
        type: "EDIT",
        payload: data
    }
}