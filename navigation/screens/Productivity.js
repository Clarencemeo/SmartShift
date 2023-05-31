import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { ReflectContext } from "../../store/reflect-context";
import { useState, useEffect, useContext } from "react";
import { Agenda } from "react-native-calendars";
// install react-native-calendars
import { Card, Avatar } from "react-native-paper";
// install react-native-paper

function Productivity({ route, navigation }) {
  const reflectCtx = useContext(ReflectContext);

  const numOfReflections = reflectCtx.reflections.length;

  const reflectionsExist = numOfReflections > 0;

  function showReflectionsHandler() {
    navigation.navigate("Reflections Agenda");
  }

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>Main Productivity Page</Text>
      {reflectionsExist && (
        <View>
          <Pressable onPress={showReflectionsHandler}>
            <Text>View Reflections</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default Productivity;

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbc4ab",
  },
  timerText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  safe: {
    flex: 1,
    backgroundColor: "#fbc4ab",
  },
  itemContainer: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
