export const Reducer = (state,action) =>{
    switch(action.type){
        //when we broadcast the signal of "UPDATE_SIGN_IN", update the global value to say that the user is logged in.
        case  'UPDATE_SIGN_IN':
            return{
                //this userToken comes from firebase
                userToken:action.payload.userToken
            }
        default:
            return state
    }
}