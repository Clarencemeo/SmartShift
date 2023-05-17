import * as React from 'react';
//import { Component } from 'react';
import { useState, useMemo, useEffect } from 'react';
import { Component } from 'react';
import { getTimerBreakDuration, getTimerWorkDuration } from './PomodoroTimer';
import { StyleSheet, View, Text, Fragment, TouchableOpacity, TouchableHighlight, Vibration} from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';
//import {NavigationContainer, useNavigation} from '@react-navigation/native';

import { SelectList } from 'react-native-dropdown-select-list';

import { Audio } from 'expo-av';

export default function TimerApp({route}) {
  //set to *60000 for actual time
  //const navigation = useNavigation(); 
  //const workDuration = route.params.workTimerDuration*60000;
  //const breakDuration = route.params.breakTimerDuration*60000;
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
    let key = Object.keys(notificationSounds).find(k=>notificationSounds[k].value === val)
    const sound = new Audio.Sound();
    if (key == 0) {
      try {
        await sound.loadAsync(require('../../resources/alarms/AlarmSound1.wav'));
        setAlarm(sound);
        console.log("setAlarm", alarm);
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
      setSelected("");
      setPlay(false);
    } else if ((play == true) &&(selected == "")&&(alarm == undefined)){
      playSound("Alarm Sound 1");  
      setSelected("");
      setPlay(false);
    }
    return alarm 
      ? () => {
        console.log('unloading');
        alarm.unloadAsync();
      }
      : undefined;
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
          handleFinish={() => { setTimerStart(false); setTimerEnd(true); setPlay(true); }}
          getTime={time => { }} />
      </View>


      <View
        height='15%'
        style={styles.buttonsRow}>


        <TouchableOpacity
          onPress={() => {
            setTimerEnd(false); setTimerStart(false); setTimerReset(true); setTimerWorking(timerEnd ? !timerWorking : timerWorking); setAlarm(undefined);
          }}
          style={[styles.roundButton, { backgroundColor: '#FFDAB9' }]}
          /*activeOpacity={1.0}*/
        >
          <View style={styles.buttonBorder}>
            <Text style={[styles.buttonTitle]} color='#ffffff'>{timerEnd ? "Move On" : "Reset"}</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity
          disabled={timerEnd}
          onPress={() => { setTimerStart(!timerStart); setTimerReset(false);}}
          style={[styles.roundButton, { backgroundColor: timerStart ? '#FFFFFF' : '#FFDAB9' }]}
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
}
//setSelected={(val) => {setSelected(val); playSound(val);}} 
const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C05050'
  },
  buttonTitle: {
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#A00000',
    textAlign: 'center',
  },
  //the row with two buttons
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginHorizontal: '10%'
  },
  roundButton: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 90,
    borderColor: '#C05050',
    borderWidth: '1',
  },
  skipBreakTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#900000',
    textAlign: 'center',
  },

  listBox: {
    borderColor: '#C05050',
    borderWidth: '1',
    borderRadius: '15'
  }
});

const timerDesign = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '5',
    borderRadius: '1000',
    backgroundColor: '#FBC4AB',
    borderColor: '#FFFFFF',
    width: '90%',
    alignSelf: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 70,
    color: 'black',
    fontWeight: '300',
  }
};