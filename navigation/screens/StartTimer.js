import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Fragment,
  TouchableOpacity,
  TouchableHighlight,
  Vibration,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import { SelectList } from "react-native-dropdown-select-list";

import { Audio } from "expo-av";

export default function TimerApp({ route }) {
  const navigation = useNavigation();
  //The timer takes time in seconds, so convert to that.
  const workDuration = route.params.workTimerDuration * 60;
  const breakDuration = route.params.breakTimerDuration * 60;

  const [timerStart, setTimerStart] = useState(true);
  const [timerReset, setTimerReset] = useState(false);
  const [timerEnd, setTimerEnd] = useState(false);

  //
  const [timerWorking, setTimerWorking] = useState(true);
  const [selected, setSelected] = useState("");
  const [slices, setSlices] = useState(0);

  //handles whether or not the Timer is counting down.
  const [play, setPlay] = useState(false);
  //Handles the reset of the timer.
  const [key, setKey] = useState(0);

  const [isPlaying, setIsPlaying] = useState(true);

  const notificationSounds = [
    { key: "1", value: "Alarm Sound 1" },
    { key: "2", value: "Alarm Sound 2" },
    { key: "3", value: "Alarm Sound 3" },
    { key: "4", value: "Alarm Sound 4" },
    { key: "5", value: "Alarm Sound 5" },
    { key: "6", value: "Alarm Sound 6" },
    { key: "7", value: "Alarm Sound 7" },
    { key: "8", value: "Vibration" },
    { key: "9", value: "None" },
  ];
  const [alarm, setAlarm] = useState();

  async function playSound(val) {
    if (alarm != undefined) {
      alarm.unloadAsync();
    }
    let key = Object.keys(notificationSounds).find(
      (k) => notificationSounds[k].value === val
    );
    const sound = new Audio.Sound();
    if (key == 0) {
      try {
        await sound.loadAsync(
          require("../../resources/alarms/AlarmSound1.wav")
        );
        setAlarm(sound);
        await sound.playAsync();
        alarm.unloadAsync();
      } catch (error) {
        console.log("Unable to set alarm sound");
      }
    } else if (key == 1) {
      try {
        await sound.loadAsync(
          require("../../resources/alarms/AlarmSound2.wav")
        );
        setAlarm(sound);
        await sound.playAsync();
        alarm.unloadAsync();
      } catch (error) {
        console.log("error");
      }
    } else if (key == 2) {
      try {
        await sound.loadAsync(
          require("../../resources/alarms/AlarmSound3.wav")
        );
        setAlarm(sound);
        await sound.playAsync();
        alarm.unloadAsync();
      } catch (error) {
        console.log("error");
      }
    } else if (key == 3) {
      try {
        await sound.loadAsync(
          require("../../resources/alarms/AlarmSound4.wav")
        );
        setAlarm(sound);
        await sound.playAsync();
        alarm.unloadAsync();
      } catch (error) {
        console.log("error");
      }
    } else if (key == 4) {
      try {
        await sound.loadAsync(
          require("../../resources/alarms/AlarmSound5.wav")
        );
        setAlarm(sound);
        await sound.playAsync();
        alarm.unloadAsync();
      } catch (error) {
        console.log("error");
      }
    } else if (key == 5) {
      try {
        await sound.loadAsync(
          require("../../resources/alarms/AlarmSound6.mp3")
        );
        setAlarm(sound);
        await sound.playAsync();
        alarm.unloadAsync();
      } catch (error) {
        console.log("error");
      }
    } else if (key == 6) {
      try {
        await sound.loadAsync(
          require("../../resources/alarms/AlarmSound7.mp3")
        );
        setAlarm(sound);
        await sound.playAsync();
        alarm.unloadAsync();
      } catch (error) {
        console.log("error");
      }
    } else if (key == 7) {
      Vibration.vibrate();
    }
  }

  useEffect(() => {
    if (play == true) {
      console.log("ready to play", "selected:", selected);
      playSound(selected);
      setPlay(false);
    }
  }, [alarm, selected, play]);

  function reflectHandler() {
    navigation.navigate("Reflect", {
      numOfSlices: slices,
      workDuration: workDuration,
      breakDuration: breakDuration,
    });
  }

  return (
    <View justifyContent="center" backgroundColor="#F4978E" height="100%">
      <View height="10%">
        <Text marginTop="2%" style={textStyles.title}>
          {timerWorking ? "Work Cycle" : "Break Time!"}
        </Text>
      </View>
      <View height="35%" justifyContent="center" alignItems="center">
        <CountdownCircleTimer
          size={225}
          key={key}
          isPlaying={isPlaying}
          duration={timerWorking ? workDuration : breakDuration}
          colors="#C30000"
          strokeWidth={6}
          strokeLinecap="round"
          onComplete={() => {
            setTimerStart(false);
            setTimerEnd(true);
            setPlay(true);
            setIsPlaying((prev) => !prev);
            if (!timerWorking) {
              setSlices((slices) => slices + 1);
            }
            return { shouldRepeat: false };
          }}
        >
          {({ remainingTime }) => (
            <Text style={textStyles.timer}>
              {String(Math.floor(remainingTime / 60)).padStart(2, "0")}:
              {String(remainingTime % 60).padStart(2, "0")}
            </Text>
          )}
        </CountdownCircleTimer>
      </View>

      <View height="15%" style={containerStyles.buttonsRow}>
        {/* Reset Button */}
        <TouchableOpacity
          onPress={() => {
            setKey((prevKey) => prevKey + 1);
            setIsPlaying(false);
            setTimerEnd(false);
            setTimerStart(false);
            setTimerReset(true);
            setTimerWorking(timerEnd ? !timerWorking : timerWorking);
          }}
          style={[containerStyles.roundButton, { backgroundColor: "#FFDAB9" }]}
        >
          <View style={containerStyles.buttonBorder}>
            <Text style={[textStyles.buttonTitle]}>
              {timerEnd ? "Continue" : "Reset"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Pause and Resume Button*/}
        <TouchableOpacity
          disabled={timerEnd}
          onPress={() => {
            setIsPlaying((prev) => !prev);
            setTimerStart(!timerStart);
            setTimerReset(false);
          }}
          style={[
            containerStyles.roundButton,
            { backgroundColor: timerStart ? "#FFFFFF" : "#FFDAB9" },
          ]}
        >
          <View style={containerStyles.buttonBorder}>
            <Text style={[textStyles.buttonTitle]}>
              {timerStart ? "Pause" : "Resume"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View height="10%">
        {!timerWorking && !timerEnd && (
          <View
            alignItems="center"
            alignSelf="stretch"
            backgroundColor="#F08080"
            borderWidth={2}
            borderColor="#900000"
            borderRadius={20}
            marginHorizontal="30%"
            marginTop="2%"
          >
            <TouchableOpacity
              onPress={() => {
                setKey((prevKey) => prevKey + 1);
                setIsPlaying(false);
                setTimerStart(false);
                setTimerReset(true);
                setTimerWorking(!timerWorking);
              }}
            >
              <Text style={textStyles.skipBreakTitle}>Skip Break</Text>
            </TouchableOpacity>
          </View>
        )}
        {!timerWorking && timerEnd && (
          <View
            alignItems="center"
            alignSelf="stretch"
            backgroundColor="#F08080"
            borderWidth={2}
            borderColor="#900000"
            borderRadius={20}
            marginHorizontal="30%"
            marginTop="2%"
          >
            <TouchableOpacity onPress={reflectHandler}>
              <Text style={textStyles.skipBreakTitle}>End Work</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View height="30%" width="50%" alignSelf="center">
        <SelectList
          setSelected={(val) => {
            setSelected(val);
            playSound(val);
          }}
          data={notificationSounds}
          save="value"
          search={false}
          boxStyles={containerStyles.listBox}
        />
      </View>
    </View>
  );
}

const textStyles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 50,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#300000",
  },
  timer: {
    fontWeight: "bold",
    fontSize: 40,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#500000",
  },

  skipBreakTitle: {
    fontSize: 25,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    color: "#900000",
    textAlign: "center",
  },

  buttonTitle: {
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
    color: "#A00000",
    textAlign: "center",
  },
});

const containerStyles = StyleSheet.create({
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C05050",
  },

  //the row with two buttons
  buttonsRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginHorizontal: "10%",
  },

  roundButton: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 90,
    borderColor: "#C05050",
    borderWidth: 1,
  },

  listBox: {
    borderColor: "#C05050",
    borderWidth: 1,
    borderRadius: 15,
    maxHeight: 125,
  },
});
