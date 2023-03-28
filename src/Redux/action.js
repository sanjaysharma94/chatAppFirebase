export const USER = "USER";

export const user = (payload)=>{
    return {
        type:USER,
        payload:payload
    }
}