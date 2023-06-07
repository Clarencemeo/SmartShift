import * as React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import { auth } from "../../firebase/firebase-config";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Icon, Button, SocialIcon } from "react-native-elements";
import { Formik } from "formik";
import {
  collection,
  onSnapshot,
  getDocs,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore/lite";
import { db } from "../../firebase/firebase-config";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const text1 = useRef(1);
  const text2 = useRef(2);

  const navigation = useNavigation();

  /*
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Flow Timer")
            }
        })
        //unsubscribe from the listener after we leave the screen
        return unsubscribe
    })
    */

  const adjustSettings = async (id, name, phone, email) => {
    await setDoc(
      doc(db, "users", id),
      {
        email: email,
        firstName: name,
        phoneNumber: phone,
        workDuration: "25",
        breakDuration: "5",
        dailyTaskGoal: "3",
        dailySliceGoal: "3",
        dailyMinutesGoal: "20",
        slices: 0,
        minutesWorked: 0,
        lastReset: "placeholder",
        deadlineNotif: true,
      },
      { merge: true }
    );
  };

  const RegisterUser = (data) => {
    const { password, email, name, phone_number } = data;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        adjustSettings(userCredential.user.uid, name, phone_number, email);
        // Signed in
        const user = userCredential.user;
        alert("Successfully registered user!");
        // ...
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("That email address is already in use");
        } else if (error.code === "auth/invalid-email") {
          alert("That email address is invalid");
        } else {
          alert(error.code);
        }
      });
  };

  return (
    <View style={styles.timerContainer}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.title}>
          <Text style={styles.titleText}>Sign-Up</Text>
        </View>
        <Formik
          initialValues={{
            phone_number: "",
            name: "",
            password: "",
            email: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            RegisterUser(values);
          }}
        >
          {(props) => (
            <View>
              <View style={styles.inputs}>
                <TextInput
                  style={styles.typeFormat}
                  placeholderTextColor={"white"}
                  placeholder="Mobile Number"
                  keyboardType="number-pad"
                  autoFocus={false}
                  value={props.values.phone_number}
                  onChangeText={props.handleChange("phone_number")}
                />
              </View>
              <View style={styles.inputs}>
                <TextInput
                  style={styles.typeFormat}
                  placeholderTextColor={"white"}
                  autoCorrect={false}
                  placeholder="Name"
                  value={props.values.name}
                  autofocus={false}
                  onChangeText={props.handleChange("name")}
                />
              </View>
              <View style={styles.inputs}>
                <TextInput
                  style={styles.typeFormat}
                  placeholderTextColor={"white"}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="Email"
                  value={props.values.email}
                  autofocus={false}
                  onChangeText={props.handleChange("email")}
                />
              </View>
              <View style={styles.inputs}>
                <TextInput
                  style={styles.typeFormat}
                  placeholderTextColor={"white"}
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Password"
                  value={props.values.password}
                  secureTextEntry={true}
                  autofocus={false}
                  onChangeText={props.handleChange("password")}
                />
              </View>
              <Button
                title="Create Account"
                buttonStyle={styles.buttonDesign}
                titleStyle={styles.titleButton}
                onPress={props.handleSubmit}
              />
            </View>
          )}
        </Formik>
        <Button
          title="Log into existing account"
          buttonStyle={styles.buttonDesign}
          titleStyle={styles.titleButton}
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fbc4ab",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  timerText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  form: {
    width: "100%",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  inputs: {
    flexDirection: "row",
    borderWidth: 3,
    // borderColor: 'grey',
    borderColor: "#F08080",
    // width: '100%',
    height: 48,
    borderWidth: 3,
    borderRadius: 12,
    width: "100%",
    marginVertical: 5,
    borderColor: "#f08080",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  typeFormat: {
    paddingHorizontal: 5,
    marginVertical: 10,
    color: "white",
    fontSize: 16,
    backgroundColor: "#FBC4AB",
    textShadowColor: "white",
  },
  title: {
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  buttonDesign: {
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#f08080",
    backgroundColor: "#f4978e",
    height: 40,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: "100%",
  },
  titleButton: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
});
