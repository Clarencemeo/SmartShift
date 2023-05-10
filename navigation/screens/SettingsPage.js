import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Checkbox from 'expo-checkbox';
//Replace default useStates with an import from main, once we figure out how the firebase thing works...
import WorkTimerInput from '../../components/WorkTimerInput';
import BreakTimerInput from '../../components/BreakTimerInput';

export default function SettingsPage(navigation) {
    //Handles notifications for alarm.
    const [enableAlarmNotif, setAlarmNotif] = useState(false);
    //Handles notifications for deadlines.
    const [enableDeadlineNotif, setDeadlineNotif] = useState(false);

    // work timer state (beginning at 25 for default)
    const [workTimer, setWorkTimer] = useState("25");
    // break timer state (beginning at 5 for default)
    const [breakTimer, setBreakTimer] = useState("5");
    //I'm reusing the WorkTimerInput//BreakTimerInput components.
    

    return (
        <View style={styles.container}>
        <View style={styles.section}>
          <Checkbox style={styles.checkbox} value={enableAlarmNotif} onValueChange={setAlarmNotif} />
          <Text style={styles.paragraph}>Notifications for Alarms</Text>
        </View>
        <View style={styles.section}>
          <Checkbox style={styles.checkbox} value={enableDeadlineNotif} onValueChange={setDeadlineNotif} />
          <Text style={styles.paragraph}>Notifications for Deadlines</Text>
        </View>



        </View>
    ); 
}
//TODO 
//Option to toggle notifications for alarm (1 h)
//Option to toggle notifications for deadlines (2 h)
//Option to change work/break timer (how long it is - default settings) (2 h) 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF0000',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
      },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    paragraph: {
      fontSize: 15,
    },
    checkbox: {
      margin: 8,
    },
  });
