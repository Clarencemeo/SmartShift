import { StyleSheet, TextInput, View, Text, Animated, Pressable, Alert } from 'react-native';
import TaskInput from './TaskInput';
import { useState } from 'react';
import Button from './Button';
import { getFormattedDate } from '../util/date';

function TaskForm({submitButtonLabel, onCancel, onSubmit, defaultValues}) {
    const [inputs, setInputs] = useState({
        description: {
            value: defaultValues ? defaultValues.description : "",
            isValid: true,
        },
        dueDate: {
            value: defaultValues ? getFormattedDate(defaultValues.dueDate) : "", 
            isValid: true,
        },
        complete: {
            value: false, 
            isValid: true
        }, 
        urgent: {
            value: false, 
            isValid: true
        }, 
        important: {
            value: false, 
            isValid: true
        }, 
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((curInputs) => {
            return {
                ...curInputs, 
                [inputIdentifier]: {value: enteredValue, isValid: true},
            };
        });
    }

    function submitHandler() {
        const taskData = {
            description: inputs.description.value,
            dueDate: new Date(inputs.dueDate.value), 
           
        }; 

        const descriptionIsValid = taskData.description.trim().length > 0;
        const dueDateIsValid = taskData.dueDate.toString() !== 'Invalid Date'; 

        if (!descriptionIsValid || !dueDateIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values'); 
            setInputs((curInputs) => {
                return {
                    description: {value: curInputs.description.value, isValid: descriptionIsValid},
                    dueDate: {value: curInputs.dueDate.value, isValid: dueDateIsValid}
                }; 
            });
            return;
        }

        onSubmit(taskData); 
    }

    const formIsInvalid = !inputs.description.isValid || !inputs.dueDate.isValid; 

    return (
        <View>
            <TaskInput 
                label="Description"
                invalid = {!inputs.description.isValid}
                textInputConfig={{
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value,
                }}
            />
            <TaskInput
                label="Date"
                invalid = {!inputs.dueDate.isValid}
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'dueDate'),
                    value: inputs.dueDate.value,
                }}
            />
            {formIsInvalid && <Text style = {styles.errorText}>Invalid Input Values </Text>}
            <View style= {styles.buttons}>
                    <Button 
                        mode = "flat" 
                        onPress={onCancel} 
                        style = {styles.button}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onPress={submitHandler} 
                        style = {styles.button}
                    >
                        {submitButtonLabel}
                    </Button>
            </View>
        </View>
    );
}

export default TaskForm; 

const styles = StyleSheet.create({
    errorText: {
        textAlign: 'center', 
        color: "#bf0603",
        marginBottom: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
})