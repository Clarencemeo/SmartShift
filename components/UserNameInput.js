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

// Component that handles the Break Timer Modal that allows user to change the length of the Break Timer

function UserNameInput(props) {
  // sets the userName value to the default previously selected/entered, default is the name attatched to email.
  const [userName, setUserName] = useState(props.defaultValues);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const userName = userData.firstName;
          setUserName(userName);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    fetchData();

    //console.log("i dunno firebase, sorry.");
  }, []);

  // sets the userName to the value entered by user
  function inputValueHandler(enteredText) {
    setUserName(enteredText);
  }

  // saves the change that the user made to userName and then closes the modal
  function changeUserName() {
    props.onSubmit(userName);
  }

  const adjustSettings = async () => {
    setDoc(
      doc(db, "users", auth.currentUser.uid),
      { firstName: userName },
      { merge: true }
    );

    //console.log("i dunno firebase, sorry.");
  };

  return (
    // returns a modal that is visible depending on props.visisble and slides up
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <View style={styles.inputTop}>
          <Text style={styles.changeTitle}>Change Username</Text>
          <TextInput
            onChangeText={inputValueHandler}
            value={userName}
            style={styles.numberInput}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Pressable
            onPress={() => {
              changeUserName();
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

export default UserNameInput;

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
