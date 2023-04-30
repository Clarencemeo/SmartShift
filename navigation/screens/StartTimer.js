import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';

//as of now, just shows the timer in a bad font.
//backend should make sure the timer is counting down. 
function App({route}) {
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

  // the Work Timer Duration value, passed from the PomodoroTimer.js page (set to default 25 unless the user changed it)
  const workDuration = route.params.workTimerDuration;
  // the Break Timer Duration value, passed from the PomodoroTimer.js page (set to default 5 unless the user changed it)
  const breakDuration = route.params.breakTimerDuration;

  return (
    <View style = {styles.font}>
        <Timer
            // Sets the Work Timer to the passed Work Timer value from PomodoroTimer.js
            totalDuration={Number(workDuration) * 60000}
            start={true}
            reset={false}
            options={timerDesign}
            handleFinish={() => {
                alert('Timer over');
            }}
            // getTime={(time) => {
            //     console.log(time);
            // }}
        />
    </View>
  );
}

export default App;

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