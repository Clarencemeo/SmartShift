import * as React from 'react';
import { Component } from 'react';
import {useState, useMemo, useEffect} from 'react';
import { getTimerBreakDuration, getTimerWorkDuration } from './PomodoroTimer';
import {StyleSheet, View, Text, Fragment, TouchableOpacity, TouchableHighlight} from 'react-native';

import { Timer } from 'react-native-stopwatch-timer';

//as of now, just shows the timer in a bad font.
//backend should make sure the timer is counting down. 

export default function TimerApp() {
    //set to *60000 for actual time
    //const workDuration = getTimerWorkDuration()*60000;
    //const breakDuration = getTimerBreakDuration()*60000;
    const workDuration = 6000;
    const breakDuration = 10000;
    const [timerStart, toggleTimer] = useState(true);
    const [timerReset, resetTimer] = useState(false);
    const [timerWorking, completeTimer] = useState(true);


    return (
        <View>
          <Timer totalDuration={(timerWorking ? workDuration: breakDuration)} msecs start={timerStart}
            reset={timerReset}
            options={timerDesign}
            handleFinish={()=>{completeTimer(!timerWorking); toggleTimer(false);}}
            getTime={time => {}}/>
          <TouchableHighlight onPress={()=>{toggleTimer(!timerStart); resetTimer(false);}}>
            <Text style={{fontSize: 30}}>{timerStart ? "Stop" : "Start"}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>{toggleTimer(false); resetTimer(true);}}>
            <Text style={{fontSize: 30}}>Reset</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>{
            if(!timerWorking){toggleTimer(false); resetTimer(true); completeTimer(!timerWorking);} 
            else{alert("can only skip breaks.");}}}>
            <Text style={{fontSize: 30}}>Skip Break</Text>
          </TouchableHighlight>
        </View>
    ); 
}

//const handleTimerComplete = ()=>{alert("???");};

  const styles = StyleSheet.create({
    font: {
        fontSize: 30
    }
});

const timerDesign = {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      fontSize: 70,
      color: "red",
      fontWeight: '200',
    }
  };
   

