import { useState } from "react";
import { StyleSheet, View, Modal, TextInput, Button, Text, Pressable} from "react-native";

function BreakTimerInput(props) {
    const [breakTime, setBreakTime] = useState(props.defaultValues ? props.defaultValues.toString() : "5",);
    
    function inputValueHandler(enteredText) { 
        setBreakTime(enteredText)
    }

    function changeBreakTime() {
        props.onSubmit(breakTime);
        setBreakTime('');
    }

    return (
        <Modal visible = {props.visible} animationType = "slide" >
            <View style={styles.inputContainer}>
                <View style={styles.inputTop}>
                    <Text style= {styles.changeTitle}>Change Break Time</Text>
                    <TextInput
                        inputMode = 'numeric'
                        keyboardType = "number-pad" 
                        maxLength = {4}
                        // placeholder="5"
                        onChangeText = {inputValueHandler}
                        value = {breakTime}
                        style = {styles.numberInput}
                    />
                </View>
                <View style = {styles.buttonStyle}>
                    <Pressable onPress={changeBreakTime}>
                        <View>
                            <Text style= {styles.timerText}>Change</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={props.onCancel}>
                        <View>
                            <Text style= {styles.timerText}>Cancel</Text>
                        </View>
                    </Pressable>
                    {/* <Button title = "Cancel" onPress = {props.onCancel}/> */}
                    {/* <Button title = "Change"/> */}
                </View>
            </View>
        </Modal>
    )

};

export default BreakTimerInput; 

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        marginBottomWidth: 1, 
        backgroundColor: '#fbc4ab'
        // borderBottomColor: 
    },
    inputTop: {
        flex: 1,
        alignItems: 'center',
        marginTop: 90,

    },
    numberInput: {
        height: 50,
        width: 75,
        fontSize: 36,
        borderBottomColor: "black",
        borderBottomWidth: 2,
        color: "black",
        marginVertical: 8,
        textAlign: 'center',
        justifyContent: 'center'
    },
    changeTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginBottom: 30,
        fontSize: 26,
        // borderRadius: 30,
        padding: 10,
        backgroundColor: '#f4978e',
        borderWidth: 5,
        borderColor: '#f08080',
        //backgroundColor: 'red',
        fontWeight: 'bold',
        opacity: 0.8,
        overflow: 'hidden'
    },
    timerText: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        fontSize: 26,
        borderRadius: 30,
        padding: 10,
        backgroundColor: '#f4978e',
        borderWidth: 5,
        borderColor: '#f08080',
        //backgroundColor: 'red',
        fontWeight: 'bold',
        opacity: 0.8,
        overflow: 'hidden'
    },
    buttonStyle: {
        alignItems: 'top',
        // justifyContent: 'top',
        flex: 1,
        flexDirection: 'row',
        fontSize: 46,
        fontWeight: 'bold',
        marginBottom: 300,
    }
});