import { StyleSheet, View } from "react-native";
import ReflectInput from "./ReflectInput";

function ReflectionViewForm({ defaultValues }) {
  return (
    <View>
      <View style={styles.titleContainer}>
        <ReflectInput
          label="Title: "
          style={styles.inputText}
          textInputConfig={{
            value: defaultValues ? defaultValues.title : "",
            editable: false,
          }}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.date}>
          <ReflectInput
            label="Date: "
            style={styles.dateText}
            textInputConfig={{
              value: defaultValues ? defaultValues.dateTime : "",
              editable: false,
            }}
          />
        </View>
        <View style={styles.titleContainer}>
          <ReflectInput
            label="Slices: "
            style={styles.inputText}
            textInputConfig={{
              value: defaultValues ? defaultValues.slices.toString() : "0",
              editable: false,
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.titleContainer}>
          <ReflectInput
            label="Working Time: "
            style={styles.inputText}
            textInputConfig={{
              value: defaultValues
                ? defaultValues.workingTime / 60 + " minutes"
                : "",
              editable: false,
            }}
          />
        </View>
        <View style={styles.titleContainer}>
          <ReflectInput
            label="Break Time: "
            style={styles.inputText}
            textInputConfig={{
              value: defaultValues
                ? defaultValues.breakTime / 60 + " minutes"
                : "",
              editable: false,
            }}
          />
        </View>
      </View>
      <View style={styles.reflectionContainer}>
        <ReflectInput
          label="Reflection: "
          style={styles.inputText}
          textInputConfig={{
            value: defaultValues ? defaultValues.reflection : "",
            editable: false,
          }}
        />
      </View>
    </View>
  );
}

export default ReflectionViewForm;

const styles = StyleSheet.create({
  date: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  dateText: {
    textAlign: "right",
    textAlignVertical: "top",
    backgroundColor: "#fbc4ab",
  },
  titleContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputText: {
    fontSize: 20,
    color: "#540b0e",
    textDecorationLine: "underline",
  },
  reflectionContainer: {
    flexDirection: "column",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  reflectionText: {
    backgroundColor: "#FFDAB9",
    fontSize: 20,
    color: "#540b0e",
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
