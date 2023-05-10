import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import  {SignInContextProvider}  from './userContexts/Context'
import { authentication } from './firebase/firebase-config'
import {useState, useEffect} from 'react';

function App() {
  return (
    <SignInContextProvider> 
      <MainContainer/>
    </SignInContextProvider>
  )
}

export default App;