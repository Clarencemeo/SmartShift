import * as React from "react";
//import { Component } from 'react';
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
import moment from "moment";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import { SelectList } from "react-native-dropdown-select-list";

import { Audio } from "expo-av";

import { auth } from "../../firebase/firebase-config";
import { db } from "../../firebase/firebase-config";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";

export default function TimerApp({ route }) {
  const navigation = useNavigation();
  //The timer takes time in seconds, so convert to that.
  //const workDuration = route.params.workTimerDuration * 60;
  //const breakDuration = route.params.breakTimerDuration * 60;
  const workDuration = 10;
  const breakDuration = 6;

  const [timerStart, setTimerStart] = useState(true);
  const [timerReset, setTimerReset] = useState(false);
  const [timerEnd, setTimerEnd] = useState(false);
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

  //resets the dailySlices and dailyMinutesWorked when it's a new day
  const resetCountIfNeeded = async (userId) => {
    const currentDate = moment().format("YYYY-MM-DD");

    const userRef = doc(db, "users", userId);

    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();

    if (userData.lastReset !== currentDate) {
      // Reset count for a new day
      await setDoc(
        userRef,
        {
          slices: 0,
          minutesWorked: 0,
          lastReset: currentDate,
        },
        { merge: true }
      );
    }
  };

  const updateCount = async (userId, count, field) => {
    const userRef = doc(db, "users", userId);

    await resetCountIfNeeded(userId);

    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();

    const newCount = parseInt(userData[field]) + parseInt(count);

    await setDoc(
      userRef,
      {
        [field]: newCount,
      },
      { merge: true }
    );
  };

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
      <View height="15%">
        <Text marginTop="5%" style={styles.titleText}>
          {timerWorking ? "Work Cycle" : "Break Time!"}
        </Text>
      </View>
      <View height="20%" justifyContent="center" alignItems="center">
        <CountdownCircleTimer
          size={225}
          key={key}
          isPlaying={isPlaying}
          duration={timerWorking ? workDuration : breakDuration}
          colors="#A30000"
          onComplete={() => {
            setTimerStart(false);
            setTimerEnd(true);
            setPlay(true);
            setIsPlaying((prev) => !prev);
            setSlices((slices) => slices + 1);
            updateCount(auth.currentUser.uid, 1, "slices");
            if (timerWorking) {
              updateCount(
                auth.currentUser.uid,
                route.params.workTimerDuration,
                "minutesWorked"
              );
            }
            return { shouldRepeat: false };
          }}
        >
          {({ remainingTime }) => (
            <Text style={styles.timerText}>
              {String(Math.floor(remainingTime / 60)).padStart(2, "0")}:
              {String(remainingTime % 60).padStart(2, "0")}
            </Text>
          )}
        </CountdownCircleTimer>
      </View>

      <View height="15%" style={styles.buttonsRow}>
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
          style={[styles.roundButton, { backgroundColor: "#FFDAB9" }]}
        >
          <View style={styles.buttonBorder}>
            <Text style={[styles.buttonTitle]} color="#ffffff">
              {timerEnd ? "Move On" : "Reset"}
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
            styles.roundButton,
            { backgroundColor: timerStart ? "#FFFFFF" : "#FFDAB9" },
          ]}
        >
          <View style={styles.buttonBorder}>
            <Text style={[styles.buttonTitle]}>
              {timerStart ? "Pause" : "Resume"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View height="10%">
        {!timerWorking && (
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
              <Text style={styles.skipBreakTitle}>Skip Break</Text>
            </TouchableOpacity>
          </View>
        )}
        {timerWorking && (
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
              <Text style={styles.skipBreakTitle}>End Work</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View height="40%" width="50%" alignSelf="center">
        <SelectList
          setSelected={(val) => {
            setSelected(val);
            playSound(val);
          }}
          data={notificationSounds}
          save="value"
          search={false}
          boxStyles={styles.listBox}
          maxHeight="150"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: "bold",
    fontSize: 50,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  timerText: {
    fontWeight: "bold",
    fontSize: 40,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C05050",
  },
  buttonTitle: {
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
    color: "#A00000",
    textAlign: "center",
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
  skipBreakTitle: {
    fontSize: 25,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    color: "#900000",
    textAlign: "center",
  },

  listBox: {
    borderColor: "#C05050",
    borderWidth: 1,
    borderRadius: 15,
  },
});

const timerDesign = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderRadius: 1000,
    backgroundColor: "#FBC4AB",
    borderColor: "#FFFFFF",
    width: "90%",
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 70,
    color: "black",
    fontWeight: "300",
  },
};
