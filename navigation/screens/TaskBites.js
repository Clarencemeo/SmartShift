import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function TaskBites(navigation) {
    return (
        <View style = {styles.timerContainer}> 
            <Text style = {styles.timerText} onPress={() => navigation.navigate('PomodoroTimer')}>Task Bites</Text>
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