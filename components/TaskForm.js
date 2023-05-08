import { StyleSheet, TextInput, View, Text, Animated, Pressable, } from 'react-native';
import TaskInput from './TaskInput';
import { useState } from 'react';
import Button from './Button';

function TaskForm({submitButtonLabel, onCancel, onSubmit}) {
    const [inputValues, setInputValues] = useState({
        description: '',
        dueDate: '',
        complete: false, 
        urgent: false,
        important: false,
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValues((curInputValues) => {
            return {
                ...curInputValues, 
                [inputIdentifier]: enteredValue,
            };
        });
    }

    function submitHandler() {
        const taskData = {
            description: inputValues.description,
            dueDate: new Date(inputValues.dueDate), 
           
        }; 

        onSubmit(taskData); 
    }

    return (
        <View>
            <TaskInput 
                label="Description"
                textInputConfig={{
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputValues.description,
                }}
            />
            <TaskInput
                label="Date"
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'dueDate'),
                    value: inputValues.dueDate,
                }}
            />
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