import {Pressable, StyleSheet, View, Text} from 'react-native';
import { getFormattedDate } from '../util/date';
import { useNavigation } from '@react-navigation/native';

// documentation on Switches: https://reactnative.dev/docs/switch 
function TaskItem({id, description, dueDate, urgent, important, complete, }) {
    const navigation = useNavigation();
    
    function taskPressHandler() {
        navigation.navigate('ManageTask', {
            taskId: id
        });
    }

    const backColorInProgress = "#fdf0d5";
    const backColorComplete = "#ffcdb2";
    const colorUsed = complete ? backColorComplete : backColorInProgress;

    return (
        <Pressable
            onPress={taskPressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.taskItem} backgroundColor = {colorUsed}>
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
        // backgroundColor: "#F4978E",
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