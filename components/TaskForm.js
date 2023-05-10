import { StyleSheet, TextInput, View, Text, Animated, Pressable, } from 'react-native';
import TaskInput from './TaskInput';

function TaskForm() {
    return (
        <View>
            <TaskInput 
                label="Description"
            />
            <TaskInput
                label="Date"
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: () => {},
                }}
            />
        </View>
    );
}

export default TaskForm; 