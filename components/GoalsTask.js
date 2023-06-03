import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TextInput,
  Button,
  Text,
  Pressable,
} from "react-native";
import { auth } from "../firebase/firebase-config";
import { db } from "../firebase/firebase-config";
import {
  collection,
  onSnapshot,
  getDoc,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore/lite";

function GoalsTask(props) {
  const [goalDesired, setGoals] = useState("3");

  const docRef = doc(db, "users", auth.currentUser.uid);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const myGoals = userData.dailyTaskGoal;
          setGoals(myGoals);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    fetchData();
  }, []);

  function inputValueHandler(enteredText) {
    setGoals(enteredText);
  }
  function changeGoals() {
    props.onSubmit(goalDesired);
  }

  const adjustSettings = async () => {
    setDoc(
      doc(db, "users", auth.currentUser.uid),
      { dailyTaskGoal: goalDesired },
      { merge: true }
    );
  };

  return (
    // returns a modal that is visible depending on props.visisble and slides up
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <View style={styles.inputTop}>
          <Text style={styles.changeTitle}>
            Set Daily Goal for Completed Tasks
          </Text>
          <TextInput
            inputMode="numeric"
            keyboardType="number-pad"
            maxLength={3}
            onChangeText={inputValueHandler}
            value={goalDesired}
            style={styles.numberInput}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Pressable
            onPress={() => {
              changeGoals();
              adjustSettings();
            }}
          >
            <View>
              <Text style={styles.timerText}>Change</Text>
            </View>
          </Pressable>
          <Pressable onPress={props.onCancel}>
            <View>
              <Text style={styles.timerText}>Cancel</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default GoalsTask;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginBottomWidth: 1,
    backgroundColor: "#fbc4ab",
  },
  inputTop: {
    flex: 1,
    alignItems: "center",
    marginTop: 90,
  },
  numberInput: {
    height: 50,
    width: 75,
    fontSize: 36,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    color: "black",
    marginVertical: 8,
    textAlign: "center",
    justifyContent: "center",
  },
  changeTitle: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginBottom: 30,
    fontSize: 26,
    padding: 10,
    backgroundColor: "#f4978e",
    borderWidth: 5,
    borderColor: "#f08080",
    fontWeight: "bold",
    opacity: 0.8,
    overflow: "hidden",
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
  buttonStyle: {
    flex: 1,
    flexDirection: "row",
    fontSize: 46,
    fontWeight: "bold",
    marginBottom: 300,
  },
});
