import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { ReflectContext } from "../../store/reflect-context";
import { useState, useEffect, useContext } from "react";
import { Agenda } from "react-native-calendars";
// install react-native-calendars
import { Card, Avatar } from "react-native-paper";
// install react-native-paper

function ReflectionView({ route, navigation }) {
  const reflectCtx = useContext(ReflectContext);

  const reflectionId = route.params?.reflectionId;

  const selectedReflection = reflectCtx.reflections.find(
    (reflections) => reflections.id === reflectionId
  );

  return (
    <View style={styles.timerContainer}>
      <View style={styles.date}>
        <Text style={styles.dateText}>{selectedReflection.dateTime}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Title: </Text>
        <Text style={styles.inputText}> {selectedReflection.title} </Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Slices: </Text>
        <Text style={styles.inputText}> {selectedReflection.slices} </Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Working Time: </Text>
        <Text style={styles.inputText}>
          {" "}
          {selectedReflection.workingTime / 60} minutes
        </Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Break Time: </Text>
        <Text style={styles.inputText}>
          {" "}
          {selectedReflection.breakTime / 60} minutes
        </Text>
      </View>
      <View style={styles.reflectionContainer}>
        <Text style={styles.text}>Reflection: </Text>
        <Text style={styles.reflectionText}>
          {" "}
          {selectedReflection.reflection}
        </Text>
      </View>
      {/* <Text style={styles.timerText}>Reflection View Page</Text> */}
    </View>
  );
}

export default ReflectionView;

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#fbc4ab",
  },
  timerText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  date: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  dateText: {
    textAlign: "right",
    textAlignVertical: "top",
    // color: "#f48c06",
  },
  titleContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
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
