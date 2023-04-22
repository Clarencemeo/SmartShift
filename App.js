import React, {useState} from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';

// A Round Button Component
//  title: the word in the button
//  color: the color of the button
//  background:  the color of the background aka the border
//  onPress: onClick function
//  disabled: whether or not it is visible (not useful for now)
function RoundButton({title, color, background, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress = { () => !disabled && onPress()}
      style = { [styles.button, {backgroundColor: background}]}
      activeOpacity = { disabled? 1.0:0.7}
    >
      <View style = {styles.buttonBorder}>
        <Text style = { [styles.buttonTitle, {color}]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const App = () => {
  let mins = 25; //default time = 25 minutes
  const [timerDuration, setTimerDuration] = useState(mins*60000); // to make it milliseconds
  //to indicate if the timer is started, when it is set as true, the timer will start
  const [isTimerStart, setIsTimerStart] = useState(false);
  //to indicate if the timer is reset, when it is set as true, the timer will be reset
  const [resetTimer, setResetTimer] = useState(false);

  return (
    <View style = {styles.container}>
      <Timer
      totalDuration={timerDuration}
      start={isTimerStart}
      reset={resetTimer}
      options={timerDesign}
      handleFinish={() => {
        alert('Timer over');
      }}
      getTime={(time) => {
        console.log(time);
      }}
      />
      {isTimerStart === false && (
        <View style = {styles.buttonsRow}>
          <RoundButton
            title='start'
            color='#50D167'
            background='#1B361F'
            onPress={() => setIsTimerStart(true)}
          />
          <RoundButton
            title='reset'
            color='#50D167'
            background='#1B361F'
            onPress={() => setResetTimer(true)}
          />
        </View>
        )
      }
      {isTimerStart === true && (
        <View style = {styles.buttonsRow}>
          <RoundButton
            title='stop'
            color='#E33935'
            background='#3C1715'
            onPress={() => {
              setIsTimerStart(false);
              setResetTimer(false);
            }}
          />
          <RoundButton
            title='reset'
            color='#50D167'
            background='#1B361F'
            onPress={() => {
              setResetTimer(true);
              setIsTimerStart(false);
            }}
          />
        </View>
        )
      }
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 18,
  },
  //the section/row with two buttons
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 80,
    marginBottom: 30,
  }
});

//style for timer
const timerDesign = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 70,
    color: "#FFFFFF",
    fontWeight: '200',
  }
};