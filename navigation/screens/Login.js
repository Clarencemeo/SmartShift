import * as React from 'react';
import {useState, useEffect, useRef, useContext} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {auth} from '../../firebase/firebase-config'
import {useNavigation} from '@react-navigation/native';
import { getAuth, setPersistence, browserSessionPersistence, signInWithEmailAndPassword} from "firebase/auth";
import { SocialIcon } from 'react-native-elements';
import {Formik} from 'formik';
import { SignInContext } from '../../userContexts/Context';

export default function Login() {
    const {dispatchSignedIn} = useContext(SignInContext)
    const text1 = useRef(1)
    const text2 = useRef(2)

    const navigation = useNavigation();

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
          if(user){
            dispatchSignedIn({type:"UPDATE_SIGN_IN",payload:{userToken:"signed-in"}})
          }else{
            dispatchSignedIn({type:"UPDATE_SIGN_IN",payload:{userToken:null}})
          }
        })
        
      },[])

    const LoginUser = (data)=> {
        const {password, email} = data
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("USER SIGNED IN")
          //tells the program that the user has signed in, and this is recorded! 
          dispatchSignedIn({type:"UPDATE_SIGN_IN",payload:{userToken:"signed-in"}})
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(error.message);
        });

    }

    return (
        <View style = {styles.timerContainer}> 
            <Formik
                initialValues = {{email:'',password:''}}
                onSubmit = {(values) => {
                    console.log(values);
                    LoginUser(values);
                }}
            > 
                { (props) => 
                    <View> 
                    <TextInput style = {styles.input} placeholder='Email' value={props.values.email} ref={text1} onChangeText={props.handleChange('email')}/>
                    <TextInput style = {styles.input} placeholder='Password' value={props.values.password} ref={text2} secureTextEntry = {true} onChangeText={props.handleChange('password')}/>

                    <Button title='Login' onPress={props.handleSubmit}/>
                    <Button title='Create Account' onPress={() => {navigation.navigate('Register')}}/>
                    </View>
                }
            </Formik>
            <View>
                <SocialIcon
                    title = "Sign in With Google"
                    button 
                    type ="google"
                    style = {styles.socialMedia}
                    onPress = {() => {}}
                />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    timerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timerText: {
        fontSize: 26,
        fontWeight: 'bold'
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    socialMedia: {
        borderRadius: 12,
        height: 50
    }
});