import * as React from "react";
import { StyleSheet, View, Text, TextInput, Pressable} from "react-native";
import { useState, useEffect } from 'react';
import Button from "../../components/Button";

export default function Reflect({ route }) {


  // how I did the current Date thing is based on this example found here: 
  // https://aboutreact.com/react-native-get-current-date-time/ 
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var AMorPM = ((hours - 12) > 0) ? "pm" : "am";
    hours = ((hours - 12) > 0) ? (hours - 12) : hours;
    // var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      month + '/' + date + '/' + year + ' ' + hours + ':' + min + " " + AMorPM
    );
  }, []);

  // to get the values for numOfSlices, workDuration and breakDuration passed by route
  // do the following: 
  // {route.params.numOfSlices}
  // {route.params.workDuration}
  // {route.params.breakDuration}
  
  return (
    <View style={styles.timerContainer}>
      <View style={styles.subContainer}> 
        <Text style={styles.title}>Create Reflection</Text>
        <View style = {styles.formTextContainer}> 
          <Text style = {styles.formText}>Feel free to write a reflection for what you accomplished: </Text>
        </View>
        <View style = {styles.formTextContainer}> 
          <Text style = {styles.formText}>Title: </Text>
          {/* <TextInput>

          </TextInput> */}
        </View>
        <View style = {styles.formTextContainer}>
          <Text style = {styles.formText}>Date: </Text>
          <Text style = {styles.formTextAutoSet}>{currentDate}</Text>
        </View>
      </View>
      <View style = {styles.buttons}>
        <Pressable>
          <Text style={styles.button}>Add Reflection</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.button}>Skip</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    backgroundColor: '#fbc4ab',
    justifyContent: 'space-between',
  },
  subContainer: {
    flex: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  formTextContainer: {
    // justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  formText: {
    fontSize: 20, 
    textAlign: "left",
  },
  formTextAutoSet: {
    color: "red",
    fontSize: 20,
  },
  date: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  dateText: {
    color: "#e85d04",
    textAlign: "right",
    textAlignVertical: "top"
  },
  buttons:{
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    fontSize: 26,
    borderRadius: 30,
    padding: 10,
    backgroundColor: "#f4978e",
    borderWidth: 5,
    borderColor: "#f08080",
    //backgroundColor: 'red',
    fontWeight: "bold",
    opacity: 0.8,
    overflow: "hidden",
  },
});
