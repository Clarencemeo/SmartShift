import {StyleSheet, View, Text} from 'react-native';
import TaskList from './TaskList';
import { SelectList } from 'react-native-dropdown-select-list'
import React, { useState } from 'react';
import { TaskContext } from '../store/tasks-context';
import { useContext } from 'react';


function TaskOutput() { 
    const [selected, setSelected] = useState("");
    const tasksCtx = useContext(TaskContext);

    const incompleteTasks = tasksCtx.tasks.filter((task) => {
        return task.complete === false; 
    });

    const completeTasks = tasksCtx.tasks.filter((task) => {
        return task.complete === true;
    }); 

    function tasksRequested(selected) {
        // console.log(selected);
        if (selected === 'In Progress') {
            return incompleteTasks;
        } else if (selected === 'Complete') {
            return completeTasks;
        } else {
            return tasksCtx.tasks;
        }
    }

    const data = [
        {key: '1', value: 'All'},
        {key: '2', value: 'In Progress'},
        {key: '3', value: 'Complete'}
    ]

    return (
        <View style = {styles.container}>
            {/* SelectList is from https://www.npmjs.com/package/react-native-dropdown-select-list*/}
            <SelectList 
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                search= {false}
                defaultOption={{ key:'1', value:'All' }}
            />
            {/* <Text>
                NOW THIS IS WHERE TASK LIST WOULD GO 
                The selected option is {selected}
            </Text> */}
            <TaskList tasks = {tasksRequested(selected)}/>
        </View>
    );

}

export default TaskOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24, 
        paddingTop: 24,
        paddingBottom: 0,
        width: "100%"
    },
    infoText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    }
});