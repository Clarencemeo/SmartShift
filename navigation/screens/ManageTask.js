import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, TextInput, View, Text, Animated, Pressable, } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useCardAnimation } from '@react-navigation/stack';
import IconButton from '../../components/IconButton';
import Button from '../../components/Button';
import { TaskContext } from '../../store/tasks-context';
import TaskForm from '../../components/TaskForm';

function ManageTask({route, navigation}) {
    const tasksCtx = useContext(TaskContext);

    const { colors } = useTheme();
    const { current } = useCardAnimation();

    const editedTaskId = route.params?.taskId;
    const isEditing = !!editedTaskId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Task' : 'Add Task',
        });
    }, [navigation, isEditing]);

    function deleteTaskHandler() {
        tasksCtx.deleteTask(editedTaskId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        if (isEditing) {
            tasksCtx.updateTask(
                editedTaskId,
                {
                    description: 'Tesk-Update', 
                    dueDate: new Date('2023-05-30'),
                    complete: true,
                    urgent: false,
                    important: false, 
                }
            );
        } else {
            tasksCtx.addTask({
                description: 'Test-Add', 
                dueDate: new Date('2023-04-30'),
                complete: false,
                urgent: false,
                important: false, 
            }); 
        }
        navigation.goBack();
    }

    return (
        <View style = {styles.modal}>
            {/* <Pressable
                style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                ]}
                onPress={navigation.goBack}
                // onPress={() => {navigation.navigate("taskBites")}}
            /> */}
            <Animated.View
                style={{
                padding: 16,
                width: '90%',
                maxWidth: 400,
                borderRadius: 3,
                // backgroundColor: colors.card,
                backgroundColor: "#F8AD9D",
                transform: [{
                    scale: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                        extrapolate: 'clamp',
                    }),
                },
                ],
            }}>
                <Text style= {styles.title}>
                    {isEditing ? 'Edit Task' : 'Add Task'}
                </Text>
                {/* <Text>
                    Inside animated View Part of Manage Task 
                </Text> */}

                <TaskForm />
                
                <View style= {styles.buttons}>
                    <Button mode = "flat" onPress={cancelHandler} style = {styles.button}>Cancel</Button>
                    <Button onPress={confirmHandler} style = {styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
                </View>
                {isEditing && (
                    <View style = {styles.deleteContainer}>
                        <IconButton 
                            icon = "trash" 
                            color = {"red"} 
                            size = {36} 
                            onPress = {deleteTaskHandler}
                        />
                    </View>
                )}
                {/* <Button
                    title="Done"
                    color={colors.primary}
                    style={{ alignSelf: 'flex-end' }}
                    // onPress={() => {navigation.navigate("taskBites")}}
                    onPress={navigation.goBack}
                /> */}
            </Animated.View>  
        </View>
    );
}

export default ManageTask;

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        height: '50%',
        top: '50%',
        backgroundColor: '#F8AD9D',
        padding: 24
    }, 
    title: {
        fontSize: 24,
        color: "black",
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 8,
        // marginLeft: 25,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: 'black',
        alignItems: 'center'
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