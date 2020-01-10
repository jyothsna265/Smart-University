
const initialState = {
    jobData:[]
}

export default function(state= initialState, action){
    switch(action.type){
        case "JOB":
            console.log("in reducer",action.payload)
            return {
                jobData:action.payload,
            }
            
        default:
            return {
                ...state
            }
    }
}