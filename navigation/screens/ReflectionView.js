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
import IconButton from "../../components/IconButton";
import ReflectInput from "../../components/ReflectInput";
import ReflectionViewForm from "../../components/ReflectionViewForm";

function ReflectionView({ route, navigation }) {
  const reflectCtx = useContext(ReflectContext);

  // const reflectionId = route.params?.reflectionId;
  const [reflectionId, setReflectionId] = useState();

  //   const [selectedReflection, setSelectedReflection] = useState();

  const selectedReflection = reflectCtx.reflections.find(
    (reflections) => reflections.id === reflectionId
  );

  // console.log(selectedReflection);

  //   const selectedReflection;

  useEffect(() => {
    setReflectionId(route.params?.reflectionId);
  }, [reflectCtx.reflections]);

  function deleteReflectionHandler() {
    navigation.navigate("Productivity Page");
    reflectCtx.deleteReflection(reflectionId);
    // navigation.navigate("Productivity Page");
    // navigation.goBack();
  }

  return (
    <View style={styles.timerContainer}>
      <ReflectionViewForm defaultValues={selectedReflection} />
      <View style={styles.deleteContainer}>
        <IconButton
          icon="trash"
          color={"red"}
          size={36}
          onPress={deleteReflectionHandler}
        />
      </View>
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
  deleteContainer: {
    marginTop: 16,
    marginHorizontal: 20,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "black",
    alignItems: "center",
  },
});
