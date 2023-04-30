import * as React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {auth} from '../../firebase/firebase-config'
import {useNavigation} from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Flow Timer")
            }
        })
        //unsubscribe from the listener after we leave the screen
        return unsubscribe
    })

    const RegisterUser = ()=> {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          alert(error.message);
          const errorCode = error.code;
          const errorMessage = error.message;
        });


    }

    const LoginUser = ()=> {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
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
            <TextInput placeholder='Email' value={email} onChangeText={text=>setEmail(text)}/>
            <TextInput placeholder='Password' value={password} secureTextEntry = {true} onChangeText={text=>setPassword(text)}/>
            <Button title='Login' onPress={LoginUser}/>
            <Button title='Register' onPress={RegisterUser}/>
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
    }
});