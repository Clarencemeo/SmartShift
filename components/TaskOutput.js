import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import TaskList from './TaskList';
import { SelectList } from 'react-native-dropdown-select-list'
import React, { useState } from 'react';
import { TaskContext } from '../store/tasks-context';
import { useContext } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function TaskOutput() { 
    const [selected, setSelected] = useState("");
    const tasksCtx = useContext(TaskContext);
    const [sortDate, setSortDate] = useState(false);
    const [sorted, setSorted] = useState(false);

    const incompleteTasks = tasksCtx.tasks.filter((task) => {
        return task.complete === false; 
    });

    const completeTasks = tasksCtx.tasks.filter((task) => {
        return task.complete === true;
    }); 

    function tasksRequested(selected) {
        if (selected === 'In Progress') {
            if ((sorted == true)&&(sortDate == true)) {
                return incompleteTasks.sort((a, b) => {
                    return a.dueDate - b.dueDate;
                });
            } else if ((sorted == true)&&(sortDate == false)) {
                return incompleteTasks.sort((a, b) => {
                    return b.dueDate - a.dueDate;
                });
            } else {
                return incompleteTasks;
            }
        } else if (selected === 'Complete') {
            if ((sorted == true)&&(sortDate == true)) {
                return completeTasks.sort((a, b) => {
                    return a.dueDate - b.dueDate;
                });
            } else if ((sorted == true)&&(sortDate == false)) {
                return completeTasks.sort((a, b) => {
                    return b.dueDate - a.dueDate;
                });
            } else {
                return completeTasks;
            }
        } else {
            if ((sorted == true)&&(sortDate == true)) {
                return tasksCtx.tasks.sort((a, b) => {
                    return a.dueDate - b.dueDate;
                });
            } else if ((sorted == true)&&(sortDate == false)) {
                return tasksCtx.tasks.sort((a, b) => {
                    return b.dueDate - a.dueDate;
                });
            } else {
                return tasksCtx.tasks;
            }
        }
    }

    function clickSort() {
        if (sorted == false) {
            setSorted(true);
            setSortDate(true);
        } else {
            setSortDate(!sortDate);
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
            <View style = {styles.sl}>
            <SelectList 
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                search= {false}
                defaultOption={{ key:'1', value:'All' }}
            />
            <View>
            <TouchableOpacity><MaterialCommunityIcons name="sort" size={30} onPress={clickSort} style = {styles.sort}/></TouchableOpacity>
            </View>
            </View>
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
    sl: {
        width: "80%",
    },
    sort: {
        flexDirection: 'row',
    },
    infoText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    }
});