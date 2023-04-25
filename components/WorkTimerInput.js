import { useState } from "react";
import { StyleSheet, View, Modal, TextInput, Button, Text} from "react-native";
import { setWorkTimer } from "../navigation/screens/PomodoroTimer";

function WorkTimerInput(props) {
    // work timer text / number input handling 
    const [enteredWorkTimerInput, setWorkTimerInput] = useState('');
    
    function workTimerInputHandler(enteredText) {
        setWorkTimerInput(enteredText);
    }

    function changeWorkTimerHandler(enteredText) {
        props.onChangeWorkTimer(enteredWorkTimerInput);
        setWorkTimerInput('');
    } 

    return (
        <Modal visible = {props.visible} animationType = "slide" >
            <View style={styles.inputContainer}>
                <View>
                    <Text>Change Work Time</Text>
                    <TextInput
                        inputMode = 'numeric'
                        keyboardType = "number-pad" 
                        maxLength = {4}
                        placeholder="25"
                        // onChangeText = {workTimerInputHandler}
                        // value = {enteredWorkTimerInput}
                        // style = {styles.numberInput}
                    />
                </View>
                <View style = {styles.buttonStyle}>
                    <Button title = "Cancel" onPress = {props.onCancel}/>
                    <Button title = "Change"/>
                </View>
            </View>
        </Modal>
    )
}; 

export default WorkTimerInput; 

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        marginBottomWidth: 1, 
        // borderBottomColor: 
    },
    textInput: {
        borderWidth: 1,
        width: '70%',
        marginRight: 8, 
        padding: 8,
    }, 
    numberInput: {
        height: 50,
        width: 75,
        fontSize: 32,
        borderBottomColor: "black",
        borderBottomWidth: 2,
        color: "black",
        marginVertical: 8,
        textAlign: 'center'
    },
    buttonStyle: {
        // flex: 1,
        // flexDirection: 'row'
    }
});