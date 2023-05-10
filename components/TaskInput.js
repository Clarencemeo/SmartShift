import { StyleSheet, TextInput, View, Text, Animated, Pressable, } from 'react-native';

function TaskInput({label, textInputConfig, invalid}) {
    return (
        <View style={styles.inputContainer}>
            <Text style= {[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={[styles.input, invalid && styles.invalidInput]} {...textInputConfig} />
        </View>
    );
}

export default TaskInput; 

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    label: {
        fontSize: 12,
        color: "#d90429",
        marginBottom: 4,
    },
    input: {
        backgroundColor: "#FBC4AB",
        padding: 6,
        borderRadius: 6,
        fontSize: 16,
        color: "#540b0e",
    },
    invalidLabel: {
        color: "#bf0603",
    },
    invalidInput: {
        backgroundColor: "#da627d",
    }
});