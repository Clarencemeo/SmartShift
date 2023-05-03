import * as React from 'react';
import {useState, useEffect, useRef, useContext} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import {auth} from '../../firebase/firebase-config'
import {useNavigation} from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {Icon, Button,SocialIcon} from 'react-native-elements'
import {Formik} from 'formik';

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const text1 = useRef(1)
    const text2 = useRef(2)

    const navigation = useNavigation();

    /*
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Flow Timer")
            }
        })
        //unsubscribe from the listener after we leave the screen
        return unsubscribe
    })
    */

    const RegisterUser = (data)=> {
        const {password, email} = data
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          alert('Successfully registered user!');
          // ...
        })
        .catch((error) => {
            if(error.code === 'auth/email-already-in-use'){
                alert(
                  'That email address is already in use'
                )
            }
            else if(error.code === 'auth/invalid-email'){
                alert(
                  'That email address is invalid'
                )
              }
            else{
            alert(error.code)
            }
        });


    }

    return (
        <View style = {styles.timerContainer}> 
            <ScrollView keyboardShouldPersistTaps = "always">
                <View style = {styles.title}>
                    <Text style ={styles.titleText}>Sign-Up</Text>
                </View>
                <Formik
                    initialValues = {{phone_number:'',name:"",password:"",email:''}}
                    onSubmit = {(values) => {
                        console.log(values);
                        RegisterUser(values);
                    }}
                > 
                    { (props) => 
                        <View> 
                        <View style = {styles.inputs}>
                            <TextInput style = {styles.typeFormat} placeholder='Mobile Number' keyboardType= "number-pad" autoFocus = {false} value={props.values.phone_number} onChangeText={props.handleChange('phone_number')}/>
                        </View>
                        <View style = {styles.inputs}>
                            <TextInput style = {styles.typeFormat} placeholder='Name' value={props.values.name} autofocus = {false} onChangeText={props.handleChange('name')}/>
                        </View>
                        <View style = {styles.inputs}>
                            <TextInput style = {styles.typeFormat} placeholder='Email' value={props.values.email} autofocus = {false} onChangeText={props.handleChange('email')}/>
                        </View>
                        <View style = {styles.inputs}>
                            <TextInput style = {styles.typeFormat} placeholder='Password' value={props.values.password} secureTextEntry = {true} autofocus = {false} onChangeText={props.handleChange('password')}/>
                        </View>
                        <Button title='Create Account' buttonStyle = {styles.buttonDesign} titleStyle = {styles.titleButton} onPress={props.handleSubmit}/>
                        </View>
                    }
                </Formik>
                <Button title='Log into existing account' buttonStyle = {styles.buttonDesign} titleStyle = {styles.titleButton} onPress={() => {navigation.navigate('Login')}}/>
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    timerContainer: {
        flex: 1,
        backgroundColor:'white'
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
    },
    inputs: {
        flexDirection:'row',
        borderWidth:1,
        borderColor: 'grey',
        borderRadius:12,
        paddingLeft:5,
        marginTop:20,
        height:48        
    },
    typeFormat: {
        fontSize: 16
    },
    title:{
        justifyContent:'center',
        alignItems:'flex-start',
        marginTop:10,
        marginBottom:10,
        paddingHorizontal:15
   },
   titleText:{
        fontSize:22,
        fontWeight:'bold'
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
});