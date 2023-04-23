import * as React from 'react';
import { getTimerWorkDuration } from './PomodoroTimer';
import {StyleSheet, View, Text, Fragment, TouchableOpacity} from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';

//as of now, just shows the timer in a bad font.
//backend should make sure the timer is counting down. 
function App() {
  const timer = getTimerWorkDuration();
  return (
    <View style = {styles.font}>
        <Timer
            totalDuration={getTimerWorkDuration() * 60000}
            start={true}
            reset={false}
            options={timerDesign}
            handleFinish={() => {
                alert('Timer over');
            }}
            getTime={(time) => {
                console.log(time);
            }}
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