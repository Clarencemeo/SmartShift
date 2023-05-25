import { StyleSheet, View, TouchableOpacity } from 'react-native';
import TaskList from './TaskList';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import React, { useState } from 'react';
import { TaskContext } from '../store/tasks-context';
import { useContext } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function TaskOutput() {
    const [filters, setFilters] = useState([]);

    const tasksCtx = useContext(TaskContext);
    const [sortDate, setSortDate] = useState(true);

    function tasksRequested(filters) {
        let requestedTasks = tasksCtx.tasks;
        for (let k in filters) {
            if (filters[k] == "In Progress") {
                requestedTasks = requestedTasks.filter((task) => {
                    return task.complete === false;
                });
            }
            if (filters[k] == "Complete") {
                requestedTasks = requestedTasks.filter((task) => {
                    return task.complete === true;
                });
            }
            if (filters[k] == "Urgent") {
                requestedTasks = requestedTasks.filter((task) => {
                    return task.urgent === true;
                });
            }
            if (filters[k] == "Not urgent") {
                requestedTasks = requestedTasks.filter((task) => {
                    return task.urgent === false;
                });
            }
            if (filters[k] == "Important") {
                requestedTasks = requestedTasks.filter((task) => {
                    return task.important === true;
                });
            }
            if (filters[k] == "Not important") {
                requestedTasks = requestedTasks.filter((task) => {
                    return task.important === false;
                });
            }
        }

        if (sortDate) {
            return requestedTasks.sort((a, b) => {
                return a.dueDate - b.dueDate;
            });
        } else {
            return requestedTasks.sort((a, b) => {
                return b.dueDate - a.dueDate;
            });
        }
    }

    const filterOptions = [
        { key: '1', value: 'In Progress' },
        { key: '2', value: 'Complete' },
        { key: '3', value: 'Urgent' },
        { key: '4', value: 'Not urgent' },
        { key: '5', value: 'Important' },
        { key: '6', value: 'Not important' },
    ]

    return (
        <View style={styles.container}>
            {/* SelectList is from https://www.npmjs.com/package/react-native-dropdown-select-list*/}
            <View style={styles.sl}>
                <View width='80%'>
                    <MultipleSelectList
                        setSelected={(val) => setFilters(val)}
                        data={filterOptions}
                        save="value"
                        label="Categories"
                        searchPlaceholder=" "
                    />
                </View>

                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name={sortDate ? "sort-calendar-ascending" : "sort-calendar-descending"}
                        size={45}
                        onPress={() => { setSortDate(!sortDate); }} />
                </TouchableOpacity>
            </View >
            < TaskList tasks={tasksRequested(filters)} />
        </View >
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
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    }
});