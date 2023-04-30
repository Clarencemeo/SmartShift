import {StyleSheet, View, Text} from 'react-native';
import TaskList from './TaskList';

function TaskOutput({tasks}) { 
    return (
    <View>
        <TaskList />
    </View>
    );

}

export default TaskOutput;

const styles = StyleSheet.create({
    timerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fbc4ab'
    }
});