import * as React from 'react';
import { Component } from 'react';
import {useState, useMemo, useEffect} from 'react';
import { getTimerBreakDuration, getTimerWorkDuration } from './PomodoroTimer';
<<<<<<< Updated upstream
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
=======
import { StyleSheet, View, Text, Fragment, TouchableOpacity, TouchableHighlight, Vibration} from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';

import { SelectList } from 'react-native-dropdown-select-list';

import { Audio } from 'expo-av';

export default function TimerApp() {
  //set to *60000 for actual time
  //const workDuration = getTimerWorkDuration()*60000;
  //const breakDuration = getTimerBreakDuration()*60000;
  const workDuration = 10000;
  const breakDuration = 6000;
  const [timerStart, setTimerStart] = useState(true);
  const [timerReset, setTimerReset] = useState(false);
  const [timerEnd, setTimerEnd] = useState(false);
  const [timerWorking, setTimerWorking] = useState(true);
  const [selected, setSelected] = useState("");
  const [play, setPlay] = useState(false);

  const notificationSounds = [
    { key: '1', value: 'Alarm Sound 1' },
    { key: '2', value: 'Alarm Sound 2' },
    { key: '3', value: 'Alarm Sound 3' },
    { key: '4', value: 'Alarm Sound 4' },
    { key: '5', value: 'Alarm Sound 5' },
    { key: '6', value: 'Alarm Sound 6' },
    { key: '7', value: 'Alarm Sound 7' },
    { key: '8', value: 'Vibration' },
    { key: '9', value: 'None' },
  ]
  const [alarm, setAlarm] = useState();

  async function playSound(val) {
    if (alarm != undefined) {
      alarm.unloadAsync();
    }
    // console.log(val);
    let key = Object.keys(notificationSounds).find(k=>notificationSounds[k].value === val)
    const sound = new Audio.Sound();
    if (key == 0) {
      try {
        await sound.loadAsync(require('../../resources/alarms/AlarmSound1.wav'));
        setAlarm(sound);
        await sound.playAsync();
      } catch (error) {
        console.log("errorrrrr")
      }
    } else if (key == 1) {
      try {
        await sound.loadAsync(require('../../resources/alarms/AlarmSound2.wav'));
        setAlarm(sound);
        await sound.playAsync();
      } catch (error) {
        console.log("errorrrrr")
      }
    } else if (key == 2) {
      try {
        await sound.loadAsync(require('../../resources/alarms/AlarmSound3.wav'));
        setAlarm(sound);
        await sound.playAsync();
      } catch (error) {
        console.log("errorrrrr")
      }
    } else if (key == 3) {
      try {
        await sound.loadAsync(require('../../resources/alarms/AlarmSound4.wav'));
        setAlarm(sound);
        await sound.playAsync();
      } catch (error) {
        console.log("errorrrrr")
      }
    } else if (key == 4) {
      try {
        await sound.loadAsync(require('../../resources/alarms/AlarmSound5.wav'));
        setAlarm(sound);
        await sound.playAsync();
      } catch (error) {
        console.log("errorrrrr")
      }
    } else if (key == 5) {
      try {
        await sound.loadAsync(require('../../resources/alarms/AlarmSound6.mp3'));
        setAlarm(sound);
        await sound.playAsync();
      } catch (error) {
        console.log("errorrrrr")
      }
    } else if (key == 6) {
      try {
        await sound.loadAsync(require('../../resources/alarms/AlarmSound7.mp3'));
        setAlarm(sound);
        await sound.playAsync();
      } catch (error) {
        console.log("errorrrrr")
      }
    } else if (key == 7) {
      Vibration.vibrate();
    }
  }  

  useEffect(() => {
    if ((play == true) &&(selected != "None")&&(selected != "")&&(alarm != undefined)) {
      console.log("ready to play", "selected:", selected);
      playSound(selected);  
      alarm.unloadAsync();
      setSelected("");
      setPlay(false);
    } else if ((play == true) &&(selected == "")){
      playSound("Alarm Sound 1");  
      alarm.unloadAsync();
      setSelected("");
      setPlay(false);
    }
  }, [alarm, selected, play]);


  return (
    <View justifyContent='center' backgroundColor='#F4978E' height='100%'>
      <View height='15%'>
        <Text
          marginTop='5%'
          style={styles.titleText}
        >{timerWorking ? "Work Cycle" : "Break Time!"}</Text>
      </View>

      <View height='20%' justifyContent='center'>
        <Timer totalDuration={(timerWorking ? workDuration : breakDuration)} secs start={timerStart}
          reset={timerReset}
          options={timerDesign}
          handleFinish={() => {setTimerStart(false); setTimerEnd(true); setPlay(true);}}
          getTime={time => { }} />
      </View>


      <View
        height='15%'
        style={styles.buttonsRow}>


        <TouchableOpacity
          onPress={() => {
            setTimerEnd(false); setTimerStart(false); setTimerReset(true); setTimerWorking(timerEnd ? !timerWorking : timerWorking);
          }}
          style={[styles.roundButton, { backgroundColor: '#FFDAB9' }]}
          activeOpacity={1.0}
        >
          <View style={styles.buttonBorder}>
            <Text style={[styles.buttonTitle]} color='#ffffff'>{timerEnd ? "Move On" : "Reset"}</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity
          disabled={timerEnd}
          onPress={() => { setTimerStart(!timerStart); setTimerReset(false); }}
          style={[styles.roundButton, { backgroundColor: timerStart ? '#FFFFFF' : '#FFDAB9' }]
          }
        >
          <View style={styles.buttonBorder}>
            <Text style={[styles.buttonTitle]}>{timerStart ? "Pause" : "Resume"}</Text>
          </View>
        </TouchableOpacity>
      </View>


      <View height='10%'>
        {(!timerWorking) && (
          <View alignItems='center'
            alignSelf='stretch'
            backgroundColor='#F08080'
            borderWidth='2'
            borderColor='#900000'
            borderRadius='20'
            marginHorizontal='30%'
            marginTop='2%'
          >
            <TouchableOpacity
              onPress={() => {
                setTimerStart(false); setTimerReset(true); setTimerWorking(!timerWorking);
              }
              }>
              <Text style={styles.skipBreakTitle}>Skip Break</Text>
            </TouchableOpacity>
          </View>
        )
        }
      </View>

      <View height='40%' width='50%' alignSelf='center'>
        <SelectList setSelected={(val) => {setSelected(val); playSound(val);}}
          data={notificationSounds}
          save="value"
          search={false}
          boxStyles={styles.listBox}
          maxHeight='200' />

      </View >

    </View >
  );
>>>>>>> Stashed changes
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


