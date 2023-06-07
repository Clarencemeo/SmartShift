import * as React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { auth } from "../../firebase/firebase-config";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Icon, Button, SocialIcon } from "react-native-elements";
import { Formik } from "formik";
import { SignInContext } from "../../userContexts/Context";
import Constants from "expo-constants";

export default function Login() {
  const { dispatchSignedIn } = useContext(SignInContext);
  const text1 = useRef(1);
  const text2 = useRef(2);

  const navigation = useNavigation();

  useEffect(() => {
    console.log("@ device   ", Constants.manifest.bundleIdentifier);
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: "signed-in" },
        });
      } else {
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: null },
        });
      }
    });
  }, []);

  const LoginUser = (data) => {
    const { password, email } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("USER SIGNED IN");
        //tells the program that the user has signed in, and this is recorded!
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: "signed-in" },
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
      });
  };

  return (
    <View style={styles.timerContainer}>
      <View style={styles.titleTextContainer}>
        <Text style={styles.title}>Sign in with your account!</Text>
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
          LoginUser(values);
        }}
      >
        {(props) => (
          <View>
            <View style={styles.TextInput2}>
              <Icon
                name="mail"
                // iconStyle ={{color:'#86939e'}}
                iconStyle={{ color: "white" }}
                type="material"
                style={{}}
              />
              <TextInput
                style={styles.input}
                placeholderTextColor={"white"}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Email"
                keyboardType="email-address"
                value={props.values.email}
                ref={text1}
                onChangeText={props.handleChange("email")}
              />
            </View>
            <View style={styles.TextInput2}>
              <Icon
                name="lock"
                // iconStyle ={{color:'#86939e'}}
                iconStyle={{ color: "white" }}
                type="material"
                style={{}}
              />
              <TextInput
                style={styles.input}
                placeholderTextColor={"white"}
                placeholder="Password"
                autoCorrect={false}
                autoCapitalize="none"
                value={props.values.password}
                ref={text2}
                secureTextEntry={true}
                onChangeText={props.handleChange("password")}
              />
            </View>
            <Button
              title="Login"
              buttonStyle={styles.buttonDesign}
              titleStyle={styles.titleButton}
              onPress={props.handleSubmit}
            />
            <Button
              title="Create Account"
              buttonStyle={styles.buttonDesign}
              titleStyle={styles.titleButton}
              onPress={() => {
                navigation.navigate("Register");
              }}
            />
          </View>
        )}
      </Formik>
      <View style={styles.googleButton}>
        <SocialIcon
          title="Sign in With Google"
          button
          type="google"
          style={styles.socialMedia}
          onPress={{}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbc4ab",
  },
  timerText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  titleTextContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    flex: 1,
    paddingHorizontal: 5,
    marginVertical: 10,
    color: "white",
    fontSize: 16,
    backgroundColor: "#FBC4AB",
    textShadowColor: "white",
  },
  googleButton: {
    width: "95%",
  },
  socialMedia: {
    borderRadius: 12,
    height: 50,
    padding: 10,
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
  },
  titleButton: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
  TextInput2: {
    borderWidth: 3,
    borderRadius: 12,
    width: "90%",
    marginVertical: 5,
    borderColor: "#f08080",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  title: {
    fontSize: 32,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});
