import {
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Animated,
  Pressable,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useCardAnimation } from "@react-navigation/stack";
import IconButton from "../../components/IconButton";
import Button from "../../components/Button";
import { TaskContext } from "../../store/tasks-context";
import TaskForm from "../../components/TaskForm";
import * as Notifications from "expo-notifications";

function ManageTask({ route, navigation }) {
  const tasksCtx = useContext(TaskContext);

  const { colors } = useTheme();
  const { current } = useCardAnimation();

  const editedTaskId = route.params?.taskId;
  const isEditing = !!editedTaskId;

  const selectedTask = tasksCtx.tasks.find((task) => task.id === editedTaskId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Task" : "Add Task",
    });
  }, [navigation, isEditing]);

  function deleteTaskHandler() {
    tasksCtx.deleteTask(editedTaskId, selectedTask);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(taskData) {
    if (isEditing) {
      tasksCtx.updateTask(editedTaskId, taskData);
    } else {
      tasksCtx.addTask(taskData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.modal}>
      <Animated.View
        style={{
          padding: 16,
          width: "90%",
          maxWidth: 400,
          borderRadius: 3,
          // backgroundColor: colors.card,
          backgroundColor: "#F8AD9D",
          transform: [
            {
              scale: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <Text style={styles.title}>{isEditing ? "Edit Task" : "Add Task"}</Text>

        <TaskForm
          onCancel={cancelHandler}
          onSubmit={confirmHandler}
          submitButtonLabel={isEditing ? "Update" : "Add"}
          checkbox={isEditing}
          defaultValues={selectedTask}
        />

        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              color={"red"}
              size={36}
              onPress={deleteTaskHandler}
            />
          </View>
        )}
      </Animated.View>
    </View>
  );
}

export default ManageTask;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    height: "30%",
    top: "30%",
    backgroundColor: "#F8AD9D",
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "black",
    alignItems: "center",
  },
});
