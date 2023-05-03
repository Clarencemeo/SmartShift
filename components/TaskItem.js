import {Pressable, StyleSheet, View, Text} from 'react-native';
import { getFormattedDate } from '../util/date';
import { TouchableOpacity } from 'react-native-gesture-handler';

// documentation on Switches: https://reactnative.dev/docs/switch 
function TaskItem({description, dueDate, urgent, important, complete}) {
    

    return (
        <Pressable
            // onPress={expensePressHandler}
            style={({ pressed }) => pressed && styles.pressed}
            >
            <View style={styles.taskItem}>
                <View style = {styles.subcontainer1}>
                    <Text style={[styles.textBase, styles.description]}>
                        {description}
                    </Text>
                    <Text style={styles.textBase}>{getFormattedDate(dueDate)}</Text>
                </View>
                {/* <View style={styles.amountContainer}>
                <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View> */}
                <View style = {styles.subcontainer2}>
                    <View>
                        <Text style={styles.textBase}>Urgent</Text>
                    </View>
                    <View>
                        <Text style={styles.textBase}>Important</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )

    // return (
    //     <Pressable
    //         style={({ pressed }) => pressed && styles.pressed}
    //     >
    //     {/* // <TouchableOpacity> */}
    //         <View style = {styles.taskItem}>
    //             <View style = {styles.description}>
    //                 <Text>{description}</Text>
    //                 <Text>{getFormattedDate(dueDate)}</Text>
    //             </View>
    //             <View style = {styles.switches}>
    //                 <Text>Urgent</Text>
    //                 {/* <Switch
    //             trackColor={{false: '#767577', true: '#81b0ff'}}
    //             thumbColor={isEnabled ? '#FFDAB9' : '#FBC4AB'}
    //             ios_backgroundColor="#3e3e3e"
    //             onValueChange={toggleSwitch}
    //             value={isEnabled}
    //         /> */}
    //             </View>
    //             <View style = {styles.switches}>
    //                 <Text>Important</Text>
    //             </View>
    //         </View>
    //     {/* </TouchableOpacity> */}
    //     </Pressable> 
    // )
}

export default TaskItem; 

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    subcontainer1: {
        flex: 3,
    },
    subcontainer2: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    taskItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: "#F4978E",
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: "#F08080",
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    }, 
    textBase: {
        // color: "#e4d9fd",
        color: "#6d6875",
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,
    },
    amount: {
        color: "#3e04c3",
        fontWeight: 'bold',
    },

});