import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { ReflectContext } from '../../store/reflect-context';
import { useState, useEffect, useContext} from 'react';
import { Agenda } from 'react-native-calendars';
// install react-native-calendars
import {Card, Avatar} from 'react-native-paper';
// install react-native-paper


// type Reflection = {
//     id: string;
//     title: string;
//     workingTime: number;
//     breakTime: number;
//     slices: number;
//     reflection: string;
//     // date: string;
//     dateTime: string;
// }; 

// type Item = {
//     name: string;
//     cookies: Boolean;
// };

function timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};

const Productivity = () => {

    // https://www.youtube.com/watch?v=RdaQIkE47Og 
    // to do calendar agenda list for reflections with dummy data 

    // https://www.youtube.com/watch?v=HF5qgqQRCWA 
    // to do calendar agenda list for the reflecttions with APIs 
    // (USE this one)

    // to do ... on the rest of text shown 
    // https://stackoverflow.com/questions/50132088/react-native-limit-the-length-of-text-displayed-in-a-card-section 
    // useful for the titles used (which would be the titles of all reflections on a day one after another)

    // To make those tappable just use Pressable or TouchableOpacity 

    // Once clicking on a date - show modal with all the enteries / reflections made on that date 

    // once you click on a reflection show a modified / different form  (Edit vs Add) of the Create Reflection Form from before 
    // which was used to create a recflection

    // Create a reflection form - only (Skip) and (Add) buttons 
    //   - Skip = to not do a reflection / don't submit form at all 
    //   - Add  = to submit a reflection form 

    // Edit / View a reflection form - only (Finish) and (Trash) buttons 
    //   - Trash  = to delete the form / reflection permenantly 
    //   - Finish = to submit all edits made / stop looking at form 

    const reflectCtx = useContext(ReflectContext);

    // const [items, setItems] = useState({
    //     '2023-05-29': [
    //         {name: "test1", cookies: true},
    //         {name: "test4", cookies: true},
    //         {name: "test5", cookies: true},
    //     ],
    //     '2023-05-30': [{name: "test2", cookies: false}],
    // });


    // const [items, setItems] = useState<{[key: string]: Reflection[]}>({
    const [items, setItems] = useState({});

    useEffect(() => {
        function getData() {
            const data = reflectCtx.reflections;

            const reduced = data.reduce((acc, currentItem) => {
                const {date, ...item} = currentItem;
                
                acc[date] = [item];

                return acc;
                }, 
                {}
            );

            setItems(reduced);
        };
        getData();
    }, []);

    console.log("items: ");
    console.log(items);

    function renderItem(item) {
        console.log("item: ");
        console.log(item);
        return (
            // <View style= {styles.itemContainer}>
            //     <Text>{item.title}</Text>
            //     <Text>{item.cookies ? 'YES' : "NO"}</Text>
            // </View>
            <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
                <Card>
                    <Card.Content>
                        <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        {/* <Typography>{item.name}</Typography> */}
                        <Text>{item.title}</Text>
                        <Avatar.Text label="J" />
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safe}>
        {/* <View style = {{flex:1}}> */}
            <Agenda items={items} renderItem = {renderItem}/>
        {/* </View> */}
        </SafeAreaView>
        // <View style={styles.timerContainer}>
        //     {/* <Text style={styles.timerText} onPress={() => navigation.navigate('PomodoroTimer')}>Productivity Scope</Text> */}
        // </View>
    );

};

export default Productivity;

const styles = StyleSheet.create({
    timerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fbc4ab',
    },
    timerText: {
        fontSize: 26,
        fontWeight: 'bold'
    },
    safe: {
        flex: 1,
        backgroundColor: '#fbc4ab',
    },
    itemContainer: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});