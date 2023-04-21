import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Text, Fragment, TouchableOpacity} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskBites from './TaskBites';
import Stacker from '../MainContainer';


//exporting these functions make them visible to other files.
//this will be useful, as we can use the timer duration
//and apply it onto other filex. 
export function getTimerWorkDuration() {
    const [timerWorkDuration, setWorkTimer] = useState('25:00');
    return timerWorkDuration;
}

export function getTimerBreakDuration() {
    const [timerBreakDuration, setBreak] = useState('05:00');
    return timerBreakDuration;
}

export default function PomodoroTimer() {
    const navigation = useNavigation();
    const timerWorkDuration = getTimerWorkDuration()
    const timerBreakDuration = getTimerBreakDuration()
    function timerWorkHandler() {
        console.log('hi');
    }

    //the TouchableOpacity is our START button.
    //for BACKEND: when this button is clicked, start the timer.
    return (
        <View style = {styles.timerContainer}> 
            <Text style = {styles.timerTitle} onPress={() => alert('Start your flow!')}>Start your flow!</Text>
            <View style = {styles.midcontainer}> 
                <Text style = {styles.timerText} onPress={() => alert('Start your flow!')}>{timerWorkDuration} Work Time</Text>
                <Text style = {styles.timerText} onPress={() => alert('Start your flow!')}>{timerBreakDuration} Break Time</Text>
                <TouchableOpacity style = {styles.buttonStyle} onPress={() =>
                    navigation.navigate('StartTimer')
                }>
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

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