import {StyleSheet, View, Text} from 'react-native';
import TaskList from './TaskList';
import { SelectList } from 'react-native-dropdown-select-list'
import React, { useState } from 'react';


const DUMMY_TASKS = [
    {
        // id: 't1',
        description: 'work on CSE 115A',
        dueDate: new Date('2023-04-30'),
        complete: false,
        urgent: false,
        important: false, 
    },
    {
        // id: 't2',
        description: 'work on CSE 108',
        dueDate: new Date('2023-05-01'),
        complete: false,
        urgent: false,
        important: false,
    },
    {
        // id: 't3',
        description: 'work on CSE 183',
        dueDate: new Date('2023-05-02'),
        complete: false,
        urgent: false,
        important: false,
    },
    {
        // id: 't4',
        description: 'work on project',
        dueDate: new Date('2023-05-03'),
        complete: false,
        urgent: false,
        important: false,
    },
    {
        // id: 't5',
        description: 'work on other project',
        dueDate: new Date('2023-05-04'),
        complete: false,
        urgent: false,
        important: false,
    },
    {
        // id: 't6',
        description: 'work on CSE 108',
        dueDate: new Date('2023-05-01'),
        complete: false,
        urgent: false,
        important: false,
    },
    {
        // id: 't7',
        description: 'work on CSE 183',
        dueDate: new Date('2023-05-02'),
        complete: false,
        urgent: false,
        important: false,
    },
    {
        // id: 't8',
        description: 'work on project',
        dueDate: new Date('2023-05-03'),
        complete: false,
        urgent: false,
        important: false,
    },
    {
        // id: 't9',
        description: 'work on other project',
        dueDate: new Date('2023-05-04'),
        complete: false,
        urgent: false,
        important: false,
    },
]


function TaskOutput({tasks}) { 
    const [selected, setSelected] = useState("");

    const data = [
        {key: '1', value: 'All'},
        {key: '2', value: 'In Progress'},
        {key: '3', value: 'Complete'}
    ]

    return (
        <View style = {styles.container}>
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
            <TaskList selection = {selected} tasks = {DUMMY_TASKS}/>
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
});