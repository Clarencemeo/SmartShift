import {Pressable, StyleSheet, View, Text} from 'react-native';
import { getFormattedDate } from '../util/date';

// documentation on Switches: https://reactnative.dev/docs/switch 
function TaskItem({description, dueDate, urgent, important, complete}) {
    // const [isEnabled, setIsEnabled] = useState(false);
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    return (
        <Pressable>
            <View style = {styles.taskItem}>
                <View style = {styles.description}>
                    <Text>{description}</Text>
                    <Text>{getFormattedDate(dueDate)}</Text>
                </View>
                <View style = {styles.switches}>
                    <Text>Urgent</Text>
                    {/* <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#FFDAB9' : '#FBC4AB'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            /> */}
                </View>
                <View style = {styles.switches}>
                    <Text>Important</Text>
                </View>
            </View>
        </Pressable> 
    )
}

export default TaskItem; 

const styles = StyleSheet.create({
    taskItem: {
        padding: 12, 
        margin: 8, 
        backgroundColour: "#F4978E",
        flexDirection: "row",
        justifyContent: 'space-between',
        borderRadius: 6, 
        shadowColor: "#b5838d",
        shadowRadius: 4, 
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4
    }, 
    description: {
        fontSize: 16, 
        marginBottom: 4,
        fontWeight: 'bold',
        color: "#003049"
    },
    switches: {
        flexDirection: 'row',
    }

});