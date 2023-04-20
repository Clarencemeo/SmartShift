import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function PomodoroTimer() {
    return (
        <View style = {styles.timerContainer}> 
            <Text style = {styles.timerText} onPress={() => alert('Start your flow!')}>Flow Timer</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    timerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timerText: {
        fontSize: 26,
        fontWeight: 'bold'
    }
});