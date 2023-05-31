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

function ReflectionView({ route, navigation, reflectionId }) {
  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>Reflection View Page</Text>
    </View>
  );
}

export default ReflectionView;

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
