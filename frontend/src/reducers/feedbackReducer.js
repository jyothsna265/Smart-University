
const initialState = {
    feedbackData:[]
}

export default function(state= initialState, action){
    switch(action.type){
        case "FEEDBACK":
            console.log("in reducer",action.payload)
            return {
                feedbackData:action.payload,
            }
            
        default:
            return {
                ...state
            }
    }
}