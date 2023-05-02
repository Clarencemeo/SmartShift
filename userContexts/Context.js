import React, {createContext,useReducer} from 'react'
import { Reducer } from './Reducer'

export const SignInContext = createContext()

export const SignInContextProvider = (props)=>{

const[signedIn,dispatchSignedIn] = useReducer(Reducer,{
    //userToken will be checked on a global level, and it tracks if the user is signed in or not.
    userToken:null,
})

return(
    <SignInContext.Provider value = {{signedIn,dispatchSignedIn}}>
        {props.children}
    </SignInContext.Provider>
)

}