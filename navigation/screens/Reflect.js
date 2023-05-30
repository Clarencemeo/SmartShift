import * as React from "react";
import { StyleSheet, View, Text, Pressable} from "react-native";
import { useState, useEffect, useContext } from 'react';
import ReflectInput from "../../components/ReflectInput";
import { ReflectContext } from "../../store/reflect-context";


function Reflect({ route, navigation }) {

  const reflectCtx = useContext(ReflectContext);

  // how I did the current Date thing is based on this example found here: 
  // https://aboutreact.com/react-native-get-current-date-time/ 
  const [currentDate, setCurrentDate] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var AMorPM = ((hours - 12) > 0) ? "pm" : "am";
    hours = ((hours - 12) > 0) ? (hours - 12) : hours;
    // var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDateTime(
      month + '/' + date + '/' + year + ' ' + hours + ':' + min + " " + AMorPM
    );
    setCurrentDate(
      year + '-' + month + '-' + date
    );
  }, []);

  // to get the values for numOfSlices, workDuration and breakDuration passed by route
  // do the following: 
  // {route.params.numOfSlices}
  // {route.params.workDuration}
  // {route.params.breakDuration}

  // { title, workingTime, breakTime, slices, reflection }

  const [inputs, setInputs] = useState({
    title: {
      value: "",
      isValid: true,
    },
    reflection: {
      value: "", 
      isValid: true,
    },
    workingTime: {
      value: route.params.workDuration, 
      isValid: true
    }, 
    breakTime: {
      value: route.params.breakDuration,
      isValid: true
    }, 
    slices: {
      value: route.params.numOfSlices, 
      isValid: true
    }, 
    date: {
      value: currentDate,
      isValid: true
    },
    dateTime: {
      value: currentDateTime,
      isValid: true
    },
  });
  
  // console.log("current date is " + currentDate);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs, 
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  }

  function skipHandler() {
    navigation.goBack();
  }

  function submitHandler() {
    const reflectData = {
      title: inputs.title.value,
      reflection: inputs.reflection.value, 
      workingTime: inputs.workingTime.value,
      breakTime: inputs.breakTime.value,
      slices: inputs.slices.value,
      // date: inputs.date.value,
      date: currentDate,
      // dateTime: inputs.dateTime.value,
      dateTime: currentDateTime,
    }; 

    const titleIsValid = reflectData.title.trim().length > 0;
    const reflectionIsValid = reflectData.reflection.trim().length > 0; 

    if (!titleIsValid || !reflectionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values'); 
      setInputs((curInputs) => {
        return {
          title: {value: curInputs.title.value, isValid: titleIsValid},
          reflection: {value: curInputs.reflection.value, isValid: reflectionIsValid}
        }; 
      });
      return;
    }

    // need to store the data in reflect-context 
    // with the addReflection method. 

    reflectCtx.addReflection(reflectData);
    
    // onSubmit(reflectData); // currently don't have an onSubmit function! need to make one 

    navigation.goBack();
  }



  const formIsInvalid = !inputs.title.isValid || !inputs.reflection.isValid; 
  
  return (
    <View style={styles.timerContainer}>
      <View style={styles.subContainer}> 
        <Text style={styles.title}>Create Reflection</Text>
        <View style = {styles.formTextContainer}> 
          <Text style = {styles.formText}>Feel free to write a reflection for what you accomplished: </Text>
        </View>
        <ReflectInput
          label="Title: "
          invalid = {!inputs.title.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, 'title'),
            value: inputs.title.value,
          }}
        />
        <View style = {styles.formTextContainer}>
          <Text style = {styles.formText}>Date: </Text>
          <Text style = {styles.formTextAutoSet}>{currentDate}</Text>
        </View>
        <ReflectInput
          label=""
          invalid = {!inputs.reflection.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, 'reflection'),
            value: inputs.reflection.value,
            multiline: true,
            placeholder: "Write your reflection here",
            placeholderTextColor: "#540b0e", 
          }}
        />
        {formIsInvalid && <Text style = {styles.errorText}>Invalid Input Values </Text>}
      </View>

      <View style = {styles.buttons}>
        <Pressable onPress = {skipHandler}>
          <Text style={styles.button}>Skip</Text>
        </Pressable>
        <Pressable onPress= {submitHandler}>
          <Text style={styles.button}>Add Reflection</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Reflect;

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
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 5,
  },
  formText: {
    fontSize: 20, 
    textAlign: "left",
  },
  formTextAutoSet: {
    color: "#540b0e",
    fontSize: 20,
  },
  date: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  dateText: {
    textAlign: "right",
    textAlignVertical: "top"
  },
  buttons:{
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
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
    fontWeight: "bold",
    opacity: 0.8,
    overflow: "hidden",
  },
  errorText: {
    textAlign: 'center', 
    color: "#bf0603",
    // marginBottom: 6,
    marginTop: 5,
    fontSize: 26,
},
});
