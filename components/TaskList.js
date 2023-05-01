// Accordion Code and insipiration came from 
// https://blog.logrocket.com/building-react-native-collapsible-accordions/#developing-accordion-with-react-native-collapsible 

import { FlatList } from 'react-native-gesture-handler';
import React, { useState } from 'react';
// import type { PropsWithChildren } from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView, Button,Pressable} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/FontAwesome';
import TaskItem from './TaskItem';


function renderTaskItem(itemData) { 
    return <TaskItem {...itemData.item}/>
}

function TaskList({tasks}) {
    const [ activeSections, setActiveSections ] = useState([]);
    const sections = [
        {
        title: 'In Progress',
        content: 
            <SafeAreaView>
                <FlatList 
                    data = {tasks} 
                    renderItem={renderTaskItem} 
                    keyExtractor = {(item) => item.id}
                />
            </SafeAreaView>
        },
        {
        title: 'Complete',
        content: 
        <View> 
            <Text style={styles.textSmall}>
                List of Complete Tasks

            </Text>
        </View>
        }
    ];
    
    function renderHeader(section, _, isActive) {
        return (
          <View style={styles.accordHeader}>
            <Text style={styles.accordTitle}>{ section.title }</Text>
            <Icon name={ isActive ? 'chevron-up' : 'chevron-down' }
                  size={20} color="F4978E" />
          </View>
        );
    };

    function renderContent(section, _, isActive) {
        return (
          <View >
            {section.content}
          </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
                {/* // contentInsetAdjustmentBehavior="automatic"
                // style={styles.container} */}
                <Accordion
                    align="bottom"
                    expandMultiple={true}
                    easing="easeInBounce"
                    duration={600}
                    sections={sections}
                    activeSections={activeSections}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    onChange={(sections) => setActiveSections(sections)}
                    sectionContainerStyle={styles.accordContainer}
                    renderAsFlatList={true}
                />
                <Pressable>
                    <View> 
                        <Text style = {styles.buttonText}>Add New Task</Text>
                    </View>
                </Pressable>
        </SafeAreaView>
    );
}


export default TaskList; 

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    accordContainer: {
        paddingBottom: 4
    },
    accordHeader: {
        padding: 12,
        backgroundColor: '#F8AD9D',
        color: '#eee',
        // flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    accordTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    accordBody: {
        padding: 12,
        flex: 1
    },
    textSmall: {
        fontSize: 16,
    },
    textSmallTop: {
        fontSize: 16,
        paddingTop: 16,
    },
    seperator: {
        height: 12
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
  
  
  