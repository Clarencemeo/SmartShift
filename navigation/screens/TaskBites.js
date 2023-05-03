import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import TaskOutput from '../../components/TaskOutput';

export default function TaskBites() {
    return (
        <View style = {styles.container}> 
            <View style = {styles.timerContainer}> 
                <TaskOutput />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbc4ab',
    },
    timerContainer: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});