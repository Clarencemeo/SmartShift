import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Animated,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

function ReflectInput({ label, textInputConfig, style, invalid }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.inputContainer, style]}>
        <Text style={[styles.label, invalid && styles.invalidLabel]}>
          {label}
        </Text>
        <TextInput style={inputStyles} {...textInputConfig} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ReflectInput;

const styles = StyleSheet.create({
  inputContainer: {
    // marginHorizontal: 4,
    // marginVertical: 8,
    // flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    // justifyContent: "space-between",
  },
  label: {
    fontSize: 20,
    textAlign: "left",
    // padding: 6,
    // fontSize: 12,
    // color: "#d90429",
    marginBottom: 4,
  },
  input: {
    // backgroundColor: "#FBC4AB",
    backgroundColor: "#FFDAB9",
    padding: 6,
    borderRadius: 6,
    fontSize: 20,
    color: "#540b0e",
  },
  inputMultiline: {
    minHeight: 150,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "#bf0603",
  },
  invalidInput: {
    backgroundColor: "#da627d",
  },
});
