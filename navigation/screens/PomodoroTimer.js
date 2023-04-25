import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Text, Fragment, TouchableOpacity} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskBites from './TaskBites';
import Stacker from '../MainContainer';


//exporting these functions make them visible to other files.
//this will be useful, as we can use the timer duration functions
//and use it in other files.

//Below is some REACT HOOKS
export function getTimerWorkDuration() {
    //This is saying: define a variable called timerWorkDuration,
    //and set the default value of this variable to 25:00.
    //You can call setWorkTimer to adjust the value of timerWorkDuration. 

    //I.E setWorkTimer(5) would set timerWorkDuration to a new value of 5.
    const [timerWorkDuration, setWorkTimer] = useState(25);
    return timerWorkDuration;
}

export function getTimerBreakDuration() {
    const [timerBreakDuration, setBreak] = useState(5);
    return timerBreakDuration;
}

export default function PomodoroTimer() {
    const navigation = useNavigation();
    const timerWorkDuration = getTimerWorkDuration()
    const timerBreakDuration = getTimerBreakDuration()
    function timerWorkHandler() {
        console.log('hi');
    }

    //the TouchableOpacity BELOW is our START button.
    //for BACKEND: when this button is clicked, start the timer.
    //navigation.navigate tells us which screen to go to next,
    //but the screen MUST be defined in the StackNavigation first in MainContainer.js
    return (
        <View style = {styles.timerContainer}> 
            <Text style = {styles.timerTitle} onPress={() => alert('Start your flow!')}>Start your flow!</Text>
            <View style = {styles.midcontainer}> 
                <Text style = {styles.timerText} onPress={() => alert('This is how long you will work!')}>{timerWorkDuration} Minute Work Time</Text>
                <Text style = {styles.timerText} onPress={() => alert('This is how long your break will be!')}>{timerBreakDuration} Minute Break Time</Text>
                <TouchableOpacity style = {styles.buttonStyle} onPress={() =>
                    navigation.navigate('StartTimer')
                }>
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

//below is just the styles. like css
//review flexbox to understand flex, alignItems, justifyContent
//(I think i may have used flexbox weirdly here, though)

const styles = StyleSheet.create({
    timerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fbc4ab'
    },
    midcontainer: {
        height: '50%',
        justifyContent: 'space-between', 
    },
    timerText: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        fontSize: 26,
        borderRadius: 30,
        padding: 10,
        backgroundColor: '#f4978e',
        borderWidth: 5,
        borderColor: '#f08080',
        //backgroundColor: 'red',
        fontWeight: 'bold',
        opacity: 0.8,
        overflow: 'hidden'
    },
    timerTitle: {
        flex: 0.3,
        fontSize: 46,
        fontWeight: 'bold',
        borderRadius: 20
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 46,
        fontWeight: 'bold',
        borderRadius: 50,
        borderWidth: 2
    },
    buttonText: {
        fontSize: 30,
        padding: 30,
    }
});