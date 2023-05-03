import * as React from 'react';
import {useState, useEffect, useRef, useContext} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {auth} from '../../firebase/firebase-config'
import {useNavigation} from '@react-navigation/native';
import { getAuth, setPersistence, browserSessionPersistence, signInWithEmailAndPassword} from "firebase/auth";
import {Icon, Button,SocialIcon} from 'react-native-elements'
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
             <View style ={{marginLeft:20, marginTop:10}}>
                 <Text style ={styles.title}>Sign in with your account!</Text>
             </View> 
            <Formik
                initialValues = {{email:'',password:''}}
                onSubmit = {(values) => {
                    console.log(values);
                    LoginUser(values);
                }}
            > 
                { (props) => 
                    <View> 
                        <View style = {styles.TextInput2}> 
                            <Icon 
                                name ="mail"
                                iconStyle ={{color:'#86939e'}}
                                type ="material"
                                style={{}}
                            />
                            <TextInput style = {styles.input} placeholder='Email' value={props.values.email} ref={text1} onChangeText={props.handleChange('email')}/>
                        </View>
                    <View style = {styles.TextInput2}> 
                    <Icon 
                            name ="lock"
                            iconStyle ={{color:'#86939e'}}
                            type ="material"
                            style={{}}
                        />
                    <TextInput style = {styles.input} placeholder='Password' value={props.values.password} ref={text2} secureTextEntry = {true} onChangeText={props.handleChange('password')}/>
                    </View>
                    <Button title='Login' buttonStyle = {styles.buttonDesign} titleStyle = {styles.titleButton} onPress={props.handleSubmit}/>
                    <Button title='Create Account' buttonStyle = {styles.buttonDesign} titleStyle = {styles.titleButton} onPress={() => {navigation.navigate('Register')}}/>
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
       flex:1,
       paddingHorizontal: 5,
       marginVertical: 10,
    },
    socialMedia: {
        borderRadius: 12,
        height: 50,
        padding: 10
    },
    buttonDesign: {
        backgroundColor:"#FBC4AB",
        alignContent:"center",
        justifyContent:"center",
        borderRadius:12,
        borderWidth:3, 
        borderColor:"#F08080",
        height:40,
        paddingHorizontal:20,
        marginVertical: 10
    },
    titleButton:{
        color:"white",
        fontSize:16,  
        fontWeight:"bold" ,
        alignItems:"center",
        justifyContent:"center"  ,
        marginTop:-3
      },
    TextInput2:{
        borderWidth:1,
        borderRadius:12,
        marginHorizontal:20,
        marginVertical: 5,
        borderColor:"#86939e",
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:"center",
        alignItems:"center",
        paddingLeft:10
      },
    title:{
        color:"#F08080",
        fontSize :20,
        fontWeight:"bold",
        padding: 10
    }
});