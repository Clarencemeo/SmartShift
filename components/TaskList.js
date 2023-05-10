// Accordion Code and insipiration came from 
// https://blog.logrocket.com/building-react-native-collapsible-accordions/#developing-accordion-with-react-native-collapsible 

import { FlatList } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView, Button, Pressable, SectionList} from 'react-native';
import TaskItem from './TaskItem';

function TaskList({tasks}) {
    function renderTaskItem(itemData) { 
        return <TaskItem {...itemData.item}/>
    }

    return (
        <View style = {styles.container}> 
            {/* <Text style = {styles.title}>{selection == 1 ? "All" : selection}</Text> */}
            <FlatList 
                data = {tasks} 
                renderItem={renderTaskItem} 
                keyExtractor = {(item) => item.id}
                // keyExtractor = {(item, index) => index.toString()}
            />
        </View>
    )
}


export default TaskList; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fbc4ab',
        marginTop: 10,
    },
    title: {
        fontSize: 26,
        margin: 10,
        justifyContent: 'center'
    },
    buttonText: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 10,
        fontSize: 20,
        borderRadius: 30,
        padding: 10,
        backgroundColor: '#f4978e',
        borderWidth: 5,
        borderColor: '#f08080',
        fontWeight: 'bold',
        opacity: 0.8,
        overflow: 'hidden'
    },

});
  
  
  