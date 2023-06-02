import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Animated,
  Pressable,
  Alert,
} from "react-native";
import TaskInput from "./TaskInput";
import { useState } from "react";
import Button from "./Button";
import { getFormattedDate } from "../util/date";
import Checkbox from "./Checkbox";

function TaskForm({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
  checkbox,
}) {
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
      value: defaultValues ? defaultValues.complete : false,
      isValid: true,
    },
    urgent: {
      value: defaultValues ? defaultValues.urgent : false,
      isValid: true,
    },
    important: {
      value: defaultValues ? defaultValues.important : false,
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  const tasksCtx = useContext(TaskContext);
  const [nId, setnId] = useState("");

  function submitHandler() {
    const taskData = {
      description: inputs.description.value,
      dueDate: new Date(inputs.dueDate.value),
      complete: inputs.complete.value,
      urgent: inputs.urgent.value,
      important: inputs.important.value,
      completedDate: new Date().toISOString(),
    };

    const descriptionIsValid = taskData.description.trim().length > 0;
    const dueDateIsValid = taskData.dueDate.toString() !== "Invalid Date";

    if (!descriptionIsValid || !dueDateIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          dueDate: { value: curInputs.dueDate.value, isValid: dueDateIsValid },
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
        invalid={!inputs.description.isValid}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      <TaskInput
        label="Date"
        invalid={!inputs.dueDate.isValid}
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangedHandler.bind(this, "dueDate"),
          value: inputs.dueDate.value,
        }}
      />
      <View style={styles.urgentView}>
        <Text style={styles.checkText}>Urgent?</Text>
        <Checkbox
          checked={inputs.urgent.value}
          onChange={inputChangedHandler.bind(this, "urgent")}
          buttonStyle={styles.checkboxBase}
          activeButtonStyle={styles.checkboxChecked}
        />
      </View>
      <View style={styles.checkView}>
        <Text style={styles.checkText}>Important?</Text>
        <Checkbox
          checked={inputs.important.value}
          onChange={inputChangedHandler.bind(this, "important")}
          buttonStyle={styles.checkboxBase}
          activeButtonStyle={styles.checkboxChecked}
        />
      </View>
      {checkbox && (
        <View style={styles.checkView}>
          <Text style={styles.checkText}>Complete?</Text>
          <Checkbox
            checked={inputs.complete.value}
            onChange={inputChangedHandler.bind(this, "complete")}
            buttonStyle={styles.checkboxBase}
            activeButtonStyle={styles.checkboxChecked}
          />
        </View>
      )}

      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid Input Values </Text>
      )}

      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default TaskForm;

const styles = StyleSheet.create({
  errorText: {
    textAlign: "center",
    color: "#bf0603",
    marginBottom: 6,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d90429",
    backgroundColor: "transparent",
  },
  checkView: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'space-between',
    marginHorizontal: 4,
    marginVertical: 8,
  },
  urgentView: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'space-between',
    marginHorizontal: 4,
    marginVertical: 8,
  },
  checkText: {
    fontSize: 12,
    color: "#d90429",
    marginBottom: 4,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#d90429",
  },
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    marginVertical: 16,
    fontWeight: "bold",
    fontSize: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: 500,
    fontSize: 18,
  },
});
