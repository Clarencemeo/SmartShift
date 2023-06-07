import * as React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import { auth } from "../../firebase/firebase-config";
import { db } from "../../firebase/firebase-config";
import { Button } from "react-native-elements";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import GoalsModals from "../../components/GoalsModals";
import * as Progress from "react-native-progress";
import moment from "moment";

// documentation on Switches: https://reactnative.dev/docs/switch
function Goals({}) {
  const [numberOfTasksCompleted, setNumberOfTasksCompleted] = useState(0);
  const [numberOfSlicesCompleted, setNumberOfSlicesCompleted] = useState(0);
  const [numberOfMinutesCompleted, setNumberOfMinutesCompleted] = useState(0);
  const [desiredTaskGoals, setTaskGoals] = useState("3");
  const [desiredSliceGoals, setSliceGoals] = useState("3");
  const [desiredMinutesGoals, setMinutesGoals] = useState("60");

  const [isTasksComplete, setIsTasksComplete] = useState(false);
  const [isSlicesComplete, setIsSlicesComplete] = useState(false);
  const [isMinutesComplete, setIsMinutesComplete] = useState(false);

  // Update the state when the progress is full

  const resetSliceCountIfNeeded = async (userId) => {
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
          lastReset: currentDate,
        },
        { merge: true }
      );
    }
  };

  const [goalTaskModalIsVisible, setGoalTaskModalIsVisible] = useState(false);
  const [goalSliceModalIsVisible, setGoalSliceModalIsVisible] = useState(false);
  const [goalMinutesModalIsVisible, setGoalMinutesModalIsVisible] =
    useState(false);

  function startGoalTaskModalHandler() {
    setGoalTaskModalIsVisible(true);
  }

  function endGoalTaskModalHandler() {
    setGoalTaskModalIsVisible(false);
  }

  function userInputGoalTimer(enteredValue) {
    endGoalTaskModalHandler();
  }

  function startGoalSliceModalHandler() {
    setGoalSliceModalIsVisible(true);
  }
  function endGoalSliceModalHandler() {
    setGoalSliceModalIsVisible(false);
  }

  function userInputGoalSlice(enteredValue) {
    endGoalSliceModalHandler();
  }

  function startGoalMinutesModalHandler() {
    setGoalMinutesModalIsVisible(true);
  }

  function endGoalMinutesModalHandler() {
    setGoalMinutesModalIsVisible(false);
  }

  function userInputGoalMinutes(enteredValue) {
    endGoalMinutesModalHandler();
  }

  async function getNumberOfTasksCompletedToday() {
    // Get the current date
    const currentDate = new Date().toLocaleDateString();

    // Create a reference to the tasks collection for the current user
    const tasksRef = collection(db, "users", auth.currentUser.uid, "tasks");

    // Create a query to filter tasks with a completedDate matching the current date
    const q = query(tasksRef, where("completedDate", "==", currentDate));
    console.log("currentDate is " + currentDate);

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Get the number of tasks matching the query
    const numberOfTasks = querySnapshot.size;

    // Return the number of tasks completed today
    console.log(numberOfTasks);
    return numberOfTasks;
  }

  const fetchTasksCompleted = async () => {
    const tasksCompleted = await getNumberOfTasksCompletedToday();
    setNumberOfTasksCompleted(tasksCompleted);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (numberOfSlicesCompleted >= desiredSliceGoals) {
        setIsSlicesComplete(true);
      } else {
        setIsSlicesComplete(false);
      }
      if (numberOfMinutesCompleted >= desiredMinutesGoals) {
        setIsMinutesComplete(true);
      } else {
        setIsMinutesComplete(false);
      }
      if (numberOfTasksCompleted >= desiredTaskGoals) {
        setIsTasksComplete(true);
      } else {
        setIsTasksComplete(false);
      }
      resetSliceCountIfNeeded(auth.currentUser.uid);
      const docRef = doc(db, "users", auth.currentUser.uid);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const myGoals = userData.dailyTaskGoal;
            const mySliceGoals = userData.dailySliceGoal;
            const myMinuteGoals = userData.dailyMinutesGoal;
            setTaskGoals(myGoals);
            setSliceGoals(mySliceGoals);
            setMinutesGoals(myMinuteGoals);
            setNumberOfSlicesCompleted(userData.slices);
            setNumberOfMinutesCompleted(userData.minutesWorked);
            fetchTasksCompleted();
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    })
  );

  return (
    <View style={styles.mainContainer}>
      <View style={{ height: "45%" }} />
      <Pressable>
        <View style={styles.taskItem1}>
          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <Text style={[styles.textBase, styles.description]}>
              {numberOfTasksCompleted} Tasks Completed Today!
            </Text>
            <Text style={styles.textBase}>Daily Goal: {desiredTaskGoals}</Text>
            <Button
              title="Set Goal"
              onPress={startGoalTaskModalHandler}
              titleStyle={{
                fontSize: 20,
              }}
              buttonStyle={{
                backgroundColor: "#f4978e",
                marginTop: "4%",
                borderWidth: 2,
                borderRadius: 20,
                borderColor: "#f08080",
                height: "70%",
              }}
            />
            <GoalsModals
              // passes value to make modal visible
              taskVisible={goalTaskModalIsVisible}
              // passes function that closes modal
              onCancel={endGoalTaskModalHandler}
              // passes function that handles user input, then closes modal
              onSubmit={userInputGoalTimer}
              defaultValues={"3"}
            />
          </View>

          <View style={styles.subcontainer2}>
            <View style={{ alignItems: "center" }}>
              <Progress.Pie
                borderWidth={2}
                borderColor="#f08080"
                progress={numberOfTasksCompleted / desiredTaskGoals}
                size={100}
                color="#f08080"
              />
            </View>
            {isTasksComplete && (
              <Text style={[styles.goalCompletedText, styles.goalReached]}>
                Goal Complete!
              </Text>
            )}
            {/* </View> */}
          </View>
        </View>
      </Pressable>
      <Pressable>
        <View style={styles.taskItem2}>
          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <Text style={[styles.textBase, styles.description]}>
              {numberOfSlicesCompleted} Slices Completed Today!
            </Text>
            <Text style={styles.textBase}>Daily Goal: {desiredSliceGoals}</Text>
            {/* <Text>{desiredSliceGoals}</Text> */}
            <Button
              title="Set Goal"
              onPress={startGoalSliceModalHandler}
              titleStyle={{
                fontSize: 20,
              }}
              buttonStyle={{
                backgroundColor: "#f4978e",
                marginTop: "4%",
                borderWidth: 2,
                borderRadius: 20,
                borderColor: "#f08080",
                height: "70%",
              }}
            />
            <GoalsModals
              // passes value to make modal visible
              sliceVisible={goalSliceModalIsVisible}
              // passes function that closes modal
              onCancel={endGoalSliceModalHandler}
              // passes function that handles user input, then closes modal
              onSubmit={userInputGoalSlice}
              defaultValues={"3"}
            />
          </View>
          <View style={styles.subcontainer2}>
            <View style={{ alignItems: "center" }}>
              <Progress.Pie
                borderWidth={2}
                borderColor="#f08080"
                progress={numberOfSlicesCompleted / desiredSliceGoals}
                size={100}
                color="#f08080"
              />
            </View>
            {isSlicesComplete && (
              <Text style={[styles.goalCompletedText, , styles.goalReached]}>
                Goal Complete!
              </Text>
            )}
          </View>
        </View>
      </Pressable>
      <Pressable>
        <View style={styles.taskItem3}>
          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <Text style={[styles.textBase, styles.description]}>
              {numberOfMinutesCompleted} Minutes Worked Today!
            </Text>
            <Text style={styles.textBase}>
              Daily Goal: {desiredMinutesGoals}
            </Text>
            {/* <Text>{desiredMinutesGoals}</Text> */}
            <Button
              title="Set Goal"
              onPress={startGoalMinutesModalHandler}
              titleStyle={{
                fontSize: 20,
              }}
              buttonStyle={{
                backgroundColor: "#f4978e",
                marginTop: "4%",
                borderWidth: 2,
                borderRadius: 20,
                borderColor: "#f08080",
                height: "70%",
              }}
            />
            <GoalsModals
              // passes value to make modal visible
              minutesVisible={goalMinutesModalIsVisible}
              // passes function that closes modal
              onCancel={endGoalMinutesModalHandler}
              // passes function that handles user input, then closes modal
              onSubmit={userInputGoalMinutes}
              defaultValues={"3"}
            />
          </View>
          <View style={styles.subcontainer2}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Progress.Pie
                borderWidth={2}
                borderColor="#f08080"
                progress={numberOfMinutesCompleted / desiredMinutesGoals}
                size={100}
                color="#f08080"
              />
            </View>
            {isMinutesComplete && (
              <Text style={[styles.goalCompletedText, styles.goalReached]}>
                Goal Complete!
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default Goals;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#fbc4ab",
  },
  pressed: {
    opacity: 0.75,
  },
  subcontainer2: {
    flexDirection: "column",
  },
  taskItem1: {
    height: "50%",
    padding: "4%",
    margin: 10,
    backgroundColor: "#fdf0d5",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: "#F08080",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  taskItem2: {
    height: "50%",
    padding: 20,
    margin: 10,
    backgroundColor: "#fdf0d5",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: "#F08080",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  taskItem3: {
    height: "50%",
    padding: "4%",
    margin: 10,
    backgroundColor: "#fdf0d5",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: "#F08080",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  goalReached: {
    fontWeight: "bold",
    justifyContent: "center",
  },
  textBase: {
    color: "#6d6875",
    fontSize: 17,
    marginBottom: "1%",
  },
  description: {
    marginBottom: "6%",
    fontWeight: "bold",
  },
  goalCompletedText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#6d6875",
  },
});
