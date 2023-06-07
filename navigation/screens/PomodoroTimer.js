import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import WorkTimerInput from "../../components/WorkTimerInput";
import BreakTimerInput from "../../components/BreakTimerInput";
import { auth } from "../../firebase/firebase-config";
import { db } from "../../firebase/firebase-config";
import {
  collection,
  onSnapshot,
  getDoc,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore/lite";
import { SignInContext } from "../../userContexts/Context";

export default function PomodoroTimer(props) {
  const { dispatchSignedIn } = useContext(SignInContext);
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const workDuration = userData.workDuration;
            const breakDuration = userData.breakDuration;
            setWorkTimer(workDuration);
            setBreakTimer(breakDuration);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    })
  );

  async function signOut() {
    try {
      auth.signOut().then(() => {
        console.log("USER SUCCESSFULLY SIGNED OUT");
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: null },
        });
      });
    } catch (error) {
      alert(error.code);
    }
  }

  // work timer state (beginning at 25 for default)
  const [workTimer, setWorkTimer] = useState("25");
  // break timer state (beginning at 5 for default)
  const [breakTimer, setBreakTimer] = useState("5");

  // changes work timer value according to user input and then closes the work modal
  function userInputWorkTimer(enteredValue) {
    setWorkTimer(Number(enteredValue));
    endWorkTimerModalHandler();
  }

  // changes break timer value according to user input and then closes the break modal
  function userInputBreakTimer(enteredValue) {
    setBreakTimer(Number(enteredValue));
    endBreakTimerModalHandler();
  }

  // extra function
  function timerWorkHandler() {
    console.log("hi");
  }

  // work timer modal useState, initially set to invisible (false)
  const [workModalIsVisible, setWorkTimerModalIsVisible] = useState(false);

  // updating function to update whether Work Timer Modal is visible
  function startWorkTimerModalHandler() {
    setWorkTimerModalIsVisible(true);
  }

  // function to close the Work Timer Modal (make it invisible)
  function endWorkTimerModalHandler() {
    setWorkTimerModalIsVisible(false);
  }

  // break timer modal useState, initially set to invisible (false)
  const [breakModalIsVisible, setBreakTimerModalIsVisible] = useState(false);

  // updating function to update whether Work Timer Modal is visible
  function startBreakTimerModalHandler() {
    setBreakTimerModalIsVisible(true);
  }

  // function to close the Work Timer Modal (make it invisible)
  function endBreakTimerModalHandler() {
    setBreakTimerModalIsVisible(false);
  }

  // function to do the navigation from this Pomodoro Timer screen to StartTimer screen with timer starting with the given values
  function startTimerHandler() {
    navigation.navigate("StartTimer", {
      workTimerDuration: workTimer,
      breakTimerDuration: breakTimer,
    });
  }

  //the TouchableOpacity BELOW is our START button.
  //for BACKEND: when this button is clicked, start the timer.
  //navigation.navigate tells us which screen to go to next,
  //but the screen MUST be defined in the TabNavigation first in MainContainer.js
  return (
    <View style={styles.timerContainer}>
      <Text
        style={styles.userProfile}
        onPress={() => {
          signOut();
        }}
      >
        Click here to logout: {auth.currentUser?.email}
      </Text>
      <Text style={styles.timerTitle} onPress={() => alert("Start your flow!")}>
        Start your flow!
      </Text>
      <View style={styles.midcontainer}>
        {/* Creates a custom button that activates modal for user to use to set custom work timer*/}
        <Pressable
          visible={workModalIsVisible}
          onPress={startWorkTimerModalHandler}
          style={styles.buttonCenter}
        >
          <View>
            <Text style={styles.timerText}>{workTimer} Minute Work Time</Text>
          </View>
        </Pressable>
        {/* The custom modal to allow user to change Work Timer value */}
        <WorkTimerInput
          // passes value to make modal visible
          visible={workModalIsVisible}
          // passes function that closes modal
          onCancel={endWorkTimerModalHandler}
          // passes function that handles user input, then closes modal
          onSubmit={userInputWorkTimer}
          // passes default value of Work Timer (whatever was previously entered, default starting at 25)
          defaultValues={workTimer}
        />

        {/* Creates a custom button thatr activate modal for user to use to set custom break timer */}
        <Pressable
          visible={breakModalIsVisible}
          onPress={startBreakTimerModalHandler}
          style={styles.buttonCenter}
        >
          <View>
            <Text style={styles.timerText}>{breakTimer} Minute Break Time</Text>
          </View>
        </Pressable>
        {/* The custom modal to allow user to change Break Timer value  */}
        <BreakTimerInput
          // passes value to make modal visible
          visible={breakModalIsVisible}
          // passes function to close modal
          onCancel={endBreakTimerModalHandler}
          // passes function that handles user input, then closes modal
          onSubmit={userInputBreakTimer}
          // passes default value of Break Timer (whatever was previously entered, default starting at 5)
          defaultValues={breakTimer}
        />
        {/* The navigation button that upon pressing "Start" button, starts the startTimerHandler function which passes 
        appropriate workTimerDuration and breakTimerDuration values to the timer and navigates the user to that page 
        where the timer promptly starts (set to the passed values) */}
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={startTimerHandler}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//below is just the styles. like css
//review flexbox to understand flex, alignItems, justifyContent
//(I think i may have used flexbox weirdly here, though)

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbc4ab",
  },
  buttonCenter: {
    alignItems: "center",
  },
  midcontainer: {
    height: "50%",
    justifyContent: "space-between",
  },
  timerText: {
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
  timerTitle: {
    flex: 0.3,
    fontSize: 46,
    fontWeight: "bold",
    borderRadius: 20,
  },
  userProfile: {
    flex: 0.1,
    fontSize: 18,
    borderRadius: 20,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 46,
    fontWeight: "bold",
    borderRadius: 50,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 35,
    padding: 30,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginBottomWidth: 1,
  },
});
