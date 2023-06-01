import { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Modal,
  TextInput,
  Button,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import UserNameInput from "../../components/UserNameInput";
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
import { storage } from "../../firebase/firebase-config";
import { ref, uploadBytes } from "firebase/storage";

import * as FileSystem from "expo-file-system";

export default function AccountSettings({ route }) {
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState(null);

  const [userNameModalIsVisible, setUserNameModalIsVisible] = useState(false);

  const fetchData = async () => {
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userName = userData.firstName;
        const image_base64 = userData.image;
        setImage(`data:image/jpeg;base64,${image_base64}`);
        setUserName(userName);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };

  useEffect(() => {
    fetchData();
    checkForCameraRollPermission();
    checkIfUserNameSet();
  }, []);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    console.log(JSON.stringify(_image));
    if (!_image.canceled) {
      setImage(_image.uri);
      const uri = _image.uri;
      const res = await FileSystem.readAsStringAsync(uri, {
        encoding: "base64",
      });
      //console.log(res);
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        await setDoc(userRef, { image: res }, { merge: true });
        console.log("image storing worked????");
      } catch (error) {
        console.log("Error storing image:", error);
      }
    }
  };

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status != "granted") {
      alert(
        "Please grant camera roll permissions inside your system's settings."
      );
    } else {
      console.log("Media Permissions are granted");
    }
  };

  function checkIfUserNameSet() {
    if (userName == null) {
      parseEmail();
    } else {
      console.log("userName:" + userName);
    }
  }

  function parseEmail() {
    let text = auth.currentUser?.email;
    const emailArray = text.split("@");
    setUserName(emailArray[0]);
  }

  function userInputUserName(enteredValue) {
    setUserName(enteredValue);
    setUserNameModalIsVisible(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.uploadProfileContainer}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <View style={styles.uploadBtnContainer}>
          <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
            <Text>{image ? "Edit" : "Upload"} Image</Text>
            <AntDesign name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={styles.userName}
        onPress={() => {
          setUserNameModalIsVisible(true);
        }}
      >
        {userName} <MaterialIcons name="mode-edit" size={20} color="black" />
      </Text>
      <UserNameInput
        // passes value to make modal visible
        visible={userNameModalIsVisible}
        // passes function that closes modal
        onCancel={() => {
          setUserNameModalIsVisible(false);
        }}
        // passes function that handles user input, then closes modal
        onSubmit={userInputUserName}
        // passes previous userName
        defaultValues={userName}
      />
      <Text style={styles.userProfile}>{auth.currentUser?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBC4AB",
    alignItems: "center",
    //justifyContent: 'center',
    //marginTop: 40
  },
  uploadProfileContainer: {
    marginTop: 30,
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    marginTop: 20,
    flex: 0.1,
    fontSize: 18,
    borderRadius: 20,
  },
  userProfile: {
    marginTop: 0,
    flex: 0.1,
    fontSize: 15,
    borderRadius: 20,
  },
});
