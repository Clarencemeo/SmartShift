import { useState } from "react";
import { StyleSheet, View, Modal, TextInput, Button, Text, Pressable} from "react-native";
import {auth} from '../firebase/firebase-config'
import {db} from '../firebase/firebase-config'
import {collection, getDocs, doc, setDoc, addDoc} from 'firebase/firestore/lite'

// Component that handles the Break Timer Modal that allows user to change the length of the Break Timer 

function BreakTimerInput(props) {
    // sets the breakTime value to the default previously selected/entered (5 if user hasn't changed it once already)
    const [breakTime, setBreakTime] = useState(props.defaultValues ? props.defaultValues.toString() : "5",);
    
    // sets the breakTime to the value entered by user 
    function inputValueHandler(enteredText) { 
        setBreakTime(enteredText)
    }

    // saves the change that the user made to breakTime and then closes the modal 
    function changeBreakTime() {
        props.onSubmit(breakTime);
    }

    const adjustSettings = async () => {
        setDoc(
            doc(db, 'users', auth.currentUser.uid), 
            { breakDuration: breakTime},
            { merge: true}
          );
    }

    return (
        // returns a modal that is visible depending on props.visisble and slides up 
        <Modal visible = {props.visible} animationType = "slide" >
            <View style={styles.inputContainer}>
                <View style={styles.inputTop}>
                    <Text style= {styles.changeTitle}>Change Break Time</Text>
                    <TextInput
                        inputMode = 'numeric'
                        keyboardType = "number-pad" 
                        maxLength = {4}
                        onChangeText = {inputValueHandler}
                        value = {breakTime}
                        style = {styles.numberInput}
                    />
                </View>
                <View style = {styles.buttonStyle}>
                    <Pressable onPress ={() => {changeBreakTime(); adjustSettings()}}>
                        <View>
                            <Text style= {styles.timerText}>Change</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={props.onCancel}>
                        <View>
                            <Text style= {styles.timerText}>Cancel</Text>
                        </View>
                    </Pressable>
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
        padding: 10,
        backgroundColor: '#f4978e',
        borderWidth: 5,
        borderColor: '#f08080',
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
        fontWeight: 'bold',
        opacity: 0.8,
        overflow: 'hidden'
    },
    buttonStyle: {
        alignItems: 'top',
        flex: 1,
        flexDirection: 'row',
        fontSize: 46,
        fontWeight: 'bold',
        marginBottom: 300,
    }
});