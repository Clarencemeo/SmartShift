import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Checkbox from 'expo-checkbox';
//Replace default useStates with an import from main, once we figure out how the firebase thing works...
import WorkTimerInput from '../../components/WorkTimerInput';
import BreakTimerInput from '../../components/BreakTimerInput';

export default function SettingsPage(navigation) {
    //Handles notifications for alarm.
    const [enableAlarmNotif, setAlarmNotif] = useState(true);
    //Handles notifications for deadlines.
    const [enableDeadlineNotif, setDeadlineNotif] = useState(true);

    // work timer state (beginning at 25 for default)
    const [defaultWorkTimer, setWorkTimer] = useState("25");
    // break timer state (beginning at 5 for default)
    const [defaultBreakTimer, setBreakTimer] = useState("5");    

    return (
        

        <View style={styles.container}>
        <Text style={styles.titleText}>Change Default Options</Text>
        {/*Checkbox for Enabling Alarm Notifications*/}
        <View style={styles.section}>
          <Checkbox style={styles.checkbox} value={enableAlarmNotif} onValueChange={setAlarmNotif}/>
          <TouchableOpacity style = {styles.button} onPress={() => {setAlarmNotif(!enableAlarmNotif)}}>
            <Text style={styles.paragraph}>Enable Notifications for Alarms</Text>
          </TouchableOpacity>  
        </View>
        {/*Checkbox for Enabling  Notifications*/}
        <View style={styles.section}>
          <Checkbox style={styles.checkbox} value={enableDeadlineNotif} onValueChange={setDeadlineNotif}/>
          <TouchableOpacity style = {styles.button} onPress={() => {setDeadlineNotif(!enableDeadlineNotif)}}>
            <Text style={styles.paragraph}>Enable Notifications for Deadlines</Text>
          </TouchableOpacity>  
        </View>
        </View>
    ); 
}
//TODO 
//Option to toggle notifications for alarm (1 h)
//Option to toggle notifications for deadlines (2 h)
//Option to change work/break timer (how long it is - default settings) (2 h) 

const styles = StyleSheet.create({
    titleText: {
        fontWeight: 'bold',
        fontSize: 35,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 20,
      },

    container: {
        flex: 1,
        backgroundColor: '#FBC4AB',
        //alignItems: 'center',
        //justifyContent: 'center',
        //marginTop: 40
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    paragraph: {
      fontSize: 20,
      alignItems: 'center',
    },
    checkbox: {
      margin: 20,
      alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#FBC4AB',
        padding: 10,
    },
  });
