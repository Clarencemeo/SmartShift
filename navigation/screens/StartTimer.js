import * as React from 'react';
import { Component } from 'react';
import {useState, useMemo, useEffect} from 'react';
import { getTimerBreakDuration, getTimerWorkDuration } from './PomodoroTimer';
import {StyleSheet, View, Text, Fragment, TouchableOpacity, TouchableHighlight} from 'react-native';

import { Timer } from 'react-native-stopwatch-timer';

//as of now, just shows the timer in a bad font.
//backend should make sure the timer is counting down. 

let WorkDuration = 0;
let BreakDuration = 0;

function durationGrabber() {
    WorkDuration = getTimerWorkDuration();
    BreakDuration = getTimerBreakDuration();
}


class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        timerStart: true,
        stopwatchStart: false,
        totalDuration: 0.10 * 60000,
        timerReset: false,
        stopwatchReset: false,
        timerWorking: true 
      };
      this.toggleTimer = this.toggleTimer.bind(this);
      this.resetTimer = this.resetTimer.bind(this);
      this.toggleStopwatch = this.toggleStopwatch.bind(this);
      this.resetStopwatch = this.resetStopwatch.bind(this);
      this.determineTime = this.determineTime.bind(this);
      this.completeTimer = this.completeTimer.bind(this);
    }
   
    toggleTimer() {
      this.setState({timerStart: !this.state.timerStart, timerReset: false});
    }
   
    resetTimer() {
      this.setState({timerStart: false, timerReset: true});
    }
   
    toggleStopwatch() {
      this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
    }
   
    resetStopwatch() {
      this.setState({stopwatchStart: false, stopwatchReset: true});
    }
    
    getFormattedTime(time) {
        this.currentTime = time;
    };

    determineTime() {
        console.log("We made it here!?");
        if (this.state.timerWorking == true) {
            //timer.timerReset = true;
            this.setState({totalDuration: 10000});
            this.toggleTimer();
            alert("Working Now!")
            //return getTimerWorkDuration() * 60000;
        }
        else {
            //timer.timerReset = true;
            alert("On break!")
            this.setState({totalDuration: 3000});
            this.toggleTimer();
            //return getTimerBreakDuration() * 60000;
        }    
    }
    
    completeTimer() {
        console.log("We made it here!");
        this.setState({timerWorking: !this.state.timerWorking});
        this.resetTimer(); 
        this.determineTime();
    }
   
    render() {
      return (
        <View>
          <Timer totalDuration={this.state.totalDuration} msecs start={this.state.timerStart}
            reset={this.state.timerReset}
            options={timerDesign}
            handleFinish={this.completeTimer}
            getTime={this.getFormattedTime} />
          <TouchableHighlight onPress={this.toggleTimer}>
            <Text style={{fontSize: 30}}>{!this.state.timerStart ? "Start" : "Stop"}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.resetTimer}>
            <Text style={{fontSize: 30}}>Reset</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
   
  const handleTimerComplete = () => alert("custom completion function");
   
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
   
export default App;

/*
export default function TimerComponent() {
    //
    //Timer is a react native object with the following properties:
    //totalDuration = duration of the timer 
    //start = if the timer is started or not 
    //by default, start is true because we started the timer on the previous screen
    //reset says if the timer is reset or not 
    //options is the DESIGN of the timer (which we defined later in the code)
    //handleFinish says what happens when the timer ends

    //getTimerWorkDuration() was defined in the PomodoroTimer file and we
    //exported it so that we could use it in this file.
    //call getTimerBreakDuration() to get the break duration and make sure to import it like at the top
 
    // make sure to import timer at the top: import { Timer } from 'react-native-stopwatch-timer';
    // and you might have to do: npm install react-native-stopwatch-timer --save   in the terminal 
    const timer = {
        timerStart: true, 
        timerReset: false,
        timerWorking: true, //when true, indicates we are in our work cycle. false, indicates we are on break. 
        timerTime: 2000,
    }
    
    function startTimer() {
        () => console.log("hello? timer start?");
        timer.timerStart = true; 
        timer.timerReset = false; 
    }
    
    function resetTimer() {
        () => console.log("hello? timer reset?");
        timer.timerStart = false; 
        timer.timerReset = true;
    } 
    
    function determineTime() {
        startTimer();
        console.log("We made it here!?");
        if (timer.timerWorking == true) {
            //timer.timerReset = true;
            timer.timerTime = 10000;
            //return getTimerWorkDuration() * 60000;
        }
        else {
            //timer.timerReset = true;
            timer.timerTime = 10000;
            //return getTimerBreakDuration() * 60000;
        }    
    }
    
    function completeTimer() {
        timer.timerWorking = !timer.timerWorking; 
        console.log("We made it here!");
        resetTimer(); 
        determineTime();
    }

    return(
        <View style = {styles.font}>
        <Timer totalDuration = {timer.timerTime} msecs start = {timer.timerStart}
        reset={timer.timerReset}
        options={timerDesign}
        handleFinish={completeTimer}
        getTime={(time) => {}}/> 

        <TouchableOpacity onPress={startTimer}>
            <Text style={{fontSize: 30}}>{timer.timerStart ? "Start" : "Stop"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetTimer}>
            <Text style={{fontSize: 30}}>Reset</Text>
        </TouchableOpacity>
        </View>
        //can also implement buttons that affect the timer if needed. 
        //removed time logging
        //I really don't know why getTime needs to be formated like 'that', but...
    );
}
*/


