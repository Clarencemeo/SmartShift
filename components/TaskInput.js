import { StyleSheet, TextInput, View, Text, Animated, Pressable, } from 'react-native';

function TaskInput({label, textInputConfig}) {
    return (
        <View>
            <Text>{label}</Text>
            <TextInput {...textInputConfig} />
        </View>
    );
}

export default TaskInput; 