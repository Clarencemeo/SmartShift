import * as React from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useEffect } from "react";
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
  deleteDoc,
} from "firebase/firestore/lite";
import GoalsModals from "../../components/GoalsModals";
import * as Progress from "react-native-progress";
import moment from "moment";

// documentation on Switches: https://reactnative.dev/docs/switch
function Goals({}) {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0.5);
  const [numberOfTasksCompleted, setNumberOfTasksCompleted] = useState(0);
  const [numberOfSlicesCompleted, setNumberOfSlicesCompleted] = useState(0);
  const [desiredTaskGoals, setTaskGoals] = useState("3");
  const [desiredSliceGoals, setSliceGoals] = useState("3");

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

  function startGoalTaskModalHandler() {
    setGoalTaskModalIsVisible(true);
  }

  function endGoalTaskModalHandler() {
    setGoalTaskModalIsVisible(false);
  }

  function userInputGoalTimer(enteredValue) {
    //setWorkTimer(Number(enteredValue));
    endGoalTaskModalHandler();
  }

  function startGoalSliceModalHandler() {
    setGoalSliceModalIsVisible(true);
  }
  function endGoalSliceModalHandler() {
    setGoalSliceModalIsVisible(false);
  }

  function userInputGoalSlice(enteredValue) {
    //setWorkTimer(Number(enteredValue));
    endGoalSliceModalHandler();
  }

  const backColorInProgress = "#fdf0d5";
  const backColorComplete = "#ffcdb2";

  const backColorImportant = "#c9184a";
  const backColorNotImportant = "white";

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

  //useEffect(() => {
  //  fetchTasksCompleted();
  //}, []);

  useFocusEffect(
    React.useCallback(() => {
      resetSliceCountIfNeeded(auth.currentUser.uid);
      const docRef = doc(db, "users", auth.currentUser.uid);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const myGoals = userData.dailyTaskGoal;
            const mySliceGoals = userData.dailySliceGoal;
            //const breakDuration = userData.breakDuration;
            setTaskGoals(myGoals);
            setSliceGoals(mySliceGoals);
            setNumberOfSlicesCompleted(userData.slices);
            fetchTasksCompleted();
            //setBreakTimer(breakDuration);
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
      <Pressable>
        <View style={styles.taskItem1}>
          <View style={styles.subcontainer1}>
            <Text style={[styles.textBase, styles.description]}>
              {numberOfTasksCompleted} Tasks Completed Today!
            </Text>
            <Text style={styles.textBase}>Daily Goal: </Text>
            <Text>{desiredTaskGoals}</Text>
            <Button
              title="Set Goal"
              onPress={startGoalTaskModalHandler}
              buttonStyle={{
                backgroundColor: "#ff4d6d",
                marginTop: 30,
                width: "100%",
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

          {/* <View style={styles.amountContainer}>
                <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View> */}
          <View style={styles.subcontainer2}>
            <View>
              <Progress.Pie
                borderWidth={2}
                borderColor="#bc3908"
                progress={numberOfTasksCompleted / desiredTaskGoals}
                size={100}
                color="#f25c54"
              />
            </View>
          </View>
        </View>
      </Pressable>

      <Pressable>
        <View style={styles.taskItem2}>
          <View style={styles.subcontainer1}>
            <Text style={[styles.textBase, styles.description]}>
              {numberOfSlicesCompleted} Slices Completed Today!
            </Text>
            <Text style={styles.textBase}>Daily Goal: </Text>
            <Text>{desiredSliceGoals}</Text>
            <Button
              title="Set Goal"
              onPress={startGoalSliceModalHandler}
              buttonStyle={{ backgroundColor: "#ff4d6d", marginTop: 30 }}
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

          {/* <View style={styles.amountContainer}>
                <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View> */}
          <View style={styles.subcontainer2}>
            <View>
              <Progress.Pie
                borderWidth={2}
                borderColor="#bc3908"
                progress={numberOfSlicesCompleted / desiredSliceGoals}
                size={100}
                color="#f25c54"
              />
            </View>
          </View>
        </View>
      </Pressable>
      <Pressable>
        <View style={styles.taskItem3}>
          <View style={styles.subcontainer1}>
            <Text style={[styles.textBase, styles.description]}>hi</Text>
            <Text style={styles.textBase}>dater</Text>
          </View>
          {/* <View style={styles.amountContainer}>
                <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View> */}
          <View style={styles.subcontainer2}>
            <View>
              <Progress.Bar
                progress={progress}
                width={100} // Set the width of the progress bar
                height={10} // Set the height of the progress bar
                color="#6d6875" // Set the color of the progress bar
                borderRadius={5} // Set the border radius of the progress bar
                // You can customize more properties as needed
              />
              <View>
                <Text>Progress: {progress}</Text>
              </View>
            </View>
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
    justifyContent: "space-around",
    backgroundColor: "#fbc4ab",
  },
  pressed: {
    opacity: 0.75,
  },
  subcontainer1: {
    //flex: 3,
  },
  subcontainer2: {
    //flex: 2,
    //flexDirection: "row",
    //justifyContent: "space-between",
  },
  taskItem1: {
    height: "45%",
    marginTop: 110,
    padding: 20,
    margin: 10,
    backgroundColor: "#F4978E",
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
    height: "45%",
    padding: 20,
    margin: 10,
    marginTop: 90,
    backgroundColor: "#F4978E",
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
    height: "45%",
    padding: 20,
    margin: 10,
    marginTop: 90,
    backgroundColor: "#F4978E",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: "#F08080",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: "#6d6875",
  },
  description: {
    fontSize: 17,
    marginBottom: 4,
    fontWeight: "bold",
  },
});
