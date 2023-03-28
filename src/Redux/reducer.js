import { USER } from "./action"

const initialState = {
    "user":{}
}


export const Reducer = (state = initialState ,action) =>{

    switch(action.type){
        case USER :
            return{
            ...state,
            "user":action.payload
        }

        default:
            return state 
    }

}

    
