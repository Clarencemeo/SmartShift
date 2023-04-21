import * as React from 'react';
import { getTimerWorkDuration } from './PomodoroTimer';
import {StyleSheet, View, Text, Fragment, TouchableOpacity} from 'react-native';

//as of now, just shows the timer in a bad font.
//backend should make sure the timer is counting down. 
function App() {
  const timer = getTimerWorkDuration();
  return (
    <View>
        <Text style = {styles.font}>{timer} hi</Text>
    </View>
  );
}

export default App;
const styles = StyleSheet.create({
    font: {
        fontSize: 30
    }
});