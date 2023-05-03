// Accordion Code and insipiration came from 
// https://blog.logrocket.com/building-react-native-collapsible-accordions/#developing-accordion-with-react-native-collapsible 

import { FlatList } from 'react-native-gesture-handler';
import React, { useState } from 'react';
// import type { PropsWithChildren } from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView, Button,Pressable,SectionList} from 'react-native';
// import Accordion from 'react-native-collapsible/Accordion';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import TaskItem from './TaskItem';
import TaskItem from './TaskItem';


// function renderTaskItem(itemData) { 
//     return <TaskItem {...itemData.item}/>
// }

function TaskList({selection, tasks}) {


    // const [ activeSections, setActiveSections ] = useState([]);

    // const sections = [
    //     {
    //     title: 'In Progress',
    //     content: 
    //         <SafeAreaView>
    //             <FlatList 
    //                 data = {tasks} 
    //                 renderItem={renderTaskItem} 
    //                 keyExtractor = {(item) => item.id}
    //                 // keyExtractor = {(item, index) => index.toString()}
    //             />
    //         </SafeAreaView>
    //     },
    //     {
    //     title: 'Complete',
    //     content: 
    //     <View> 
    //         <Text style={styles.textSmall}>List of Complete Tasks</Text>
    //     </View>
    //     }
    // ];
    
    // function renderHeader(section, _, isActive) {
    //     return (
    //       <View style={styles.accordHeader}>
    //         <Text style={styles.accordTitle}>{ section.title }</Text>
    //         <Icon name={ isActive ? 'chevron-up' : 'chevron-down' }
    //               size={20} color="F4978E" />
    //       </View>
    //     );
    // };

    // function renderContent(section, _, isActive) {
    //     return (
    //       <View >
    //         {section.content}
    //       </View>
    //     );
    // }
 
    // const seperatorView = () => {
    //     return (
    //         <View style = {styles.listItemSeperatorStyle}/>
    //     )
    // }

    // let DUMMY_TASKS = [
    //     {
    //         id: 't1',
    //         description: 'work on CSE 115A',
    //         dueDate: new Date('2023-04-30'),
    //         complete: false,
    //         urgent: false,
    //         important: false, 
    //     },
    //     {
    //         id: 't2',
    //         description: 'work on CSE 108',
    //         dueDate: new Date('2023-05-01'),
    //         complete: false,
    //         urgent: false,
    //         important: false,
    //     }
    // ];

    // const DATA = [
    //     {
    //       title: 'Main dishes',
    //       data: ['Pizza', 'Burger', 'Risotto'],
    //     },
    //     {
    //       title: 'Sides',
    //       data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    //     },
    //     {
    //       title: 'Drinks',
    //       data: ['Water', 'Coke', 'Beer'],
    //     },
    //     {
    //       title: 'Desserts',
    //       data: ['Cheese Cake', 'Ice Cream'],
    //     },
    // ];

    function renderTaskItem(itemData) { 
        return <TaskItem {...itemData.item}/>
    }

    return (
        <View style = {styles.container}> 
            {/* <Text style = {styles.title}>{selection == 1 ? "All" : selection}</Text> */}
            <FlatList 
                data = {tasks} 
                renderItem={renderTaskItem} 
                        // keyExtractor = {(item) => item.id}
                keyExtractor = {(item, index) => index.toString()}
            />
        </View>

        // <View> 
        //     <SectionItem title = "In Progress" tasks = {tasks}/>
        //     <SectionItem title = "Complete" tasks = {tasks}/>
        // </View>

        // <SafeAreaView style={styles.container}>
        //     <Text>
        //         Section List Below
        //     </Text>
        //     <SectionList
        //         // sections={DATA}
        //         sections={
        //             [
        //                 {title: 'In Progress', data: DUMMY_TASKS},
        //                 {title: 'Complete', data: DUMMY_TASKS}
        //             ]
        //         }
        //         ItemSeparatorComponent = {seperatorView}
        //         keyExtractor={(item, index) => item + index}
        //         // renderItem={({item}) => (
        //         //     <View style={styles.item}>
        //         //     <Text style={styles.title}>{item}</Text>
        //         //     </View>
        //         // )}
        //         renderItem = {({item}) => (
        //             <Text 
        //                 style = {styles.secttionListItemStyle}
        //                 onPress = {() => alert(JSON.stringify(item))}
        //             >
        //                 {item}
        //             </Text>
        //         )}
        //         renderSectionHeader={({section: {title}}) => (
        //             <Text style={styles.header}>{title}</Text>
        //         )}
        //     />
        // </SafeAreaView>        

        // <SafeAreaView style = {{flex: 1}}> 
        //     <View style = {styles.container}>
        //         <Text>
        //             Section list below
        //         </Text>
        //         <SectionList 
        //             ItemSeparatorComponent = {seperatorView}
        //             sections = {[
        //                 {title: 'In Progress', data: DUMMY_TASKS},
        //                 {title: 'Complete', data: {tasks}}
        //             ]}
        //             renderSectionHeader = {({section}) => (
        //                 <Text style = {styles.sectionHeaderStyle}>
        //                     {section.title}
        //                 </Text>
        //             )}
        //             renderItem = {({item}) => (
        //                 <Text 
        //                     style = {styles.secttionListItemStyle}
        //                     onPress = {() => alert(JSON.stringify(item))}
        //                 >
        //                     {item.description}
        //                 </Text>
        //             )}
        //             keyExtractor = {(item, index) => index.toString()}
        //         />
        //     </View>
        // </SafeAreaView>

        // <TestFile />
        // <SafeAreaView style={styles.container}>

                // {/* <Accordion
                //     align="bottom"
                //     expandMultiple={true}
                //     easing="easeInBounce"
                //     duration={600}
                //     sections={sections}
                //     activeSections={activeSections}
                //     renderHeader={renderHeader}
                //     renderContent={renderContent}
                //     onChange={(sections) => setActiveSections(sections)}
                //     sectionContainerStyle={styles.accordContainer}
                //     renderAsFlatList={true}
                // /> */}
                // {/* <Pressable>
                //     <View> 
                //         <Text style = {styles.buttonText}>Add New Task</Text>
                //     </View>
                // </Pressable> */}
        // {/* </SafeAreaView> */}
    )
}


export default TaskList; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fbc4ab',

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
  
  
  