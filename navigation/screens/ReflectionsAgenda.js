import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { ReflectContext } from "../../store/reflect-context";
import { useState, useEffect, useContext } from "react";
import { Agenda } from "react-native-calendars";
// install react-native-calendars
import { Card, Avatar } from "react-native-paper";
// install react-native-paper

function timeToString(time) {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
}

function ReflectionsAgenda({ route, navigation }) {
  // https://www.youtube.com/watch?v=RdaQIkE47Og
  // to do calendar agenda list for reflections with dummy data

  // https://www.youtube.com/watch?v=HF5qgqQRCWA
  // to do calendar agenda list for the reflecttions with APIs
  // (USE this one)

  // to do ... on the rest of text shown
  // https://stackoverflow.com/questions/50132088/react-native-limit-the-length-of-text-displayed-in-a-card-section
  // useful for the titles used (which would be the titles of all reflections on a day one after another)

  // To make those tappable just use Pressable or TouchableOpacity

  // Once clicking on a date - show modal with all the enteries / reflections made on that date

  // once you click on a reflection show a modified / different form  (Edit vs Add) of the Create Reflection Form from before
  // which was used to create a recflection

  // Create a reflection form - only (Skip) and (Add) buttons
  //   - Skip = to not do a reflection / don't submit form at all
  //   - Add  = to submit a reflection form

  // Edit / View a reflection form - only (Finish) and (Trash) buttons
  //   - Trash  = to delete the form / reflection permenantly
  //   - Finish = to submit all edits made / stop looking at form

  const reflectCtx = useContext(ReflectContext);

  const [items, setItems] = useState({});
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    function getData() {
      const data = reflectCtx.reflections;

      const initialDate = reflectCtx.reflections[0].date;
      //   console.log(initialDate);

      const reduced = data.reduce((acc, currentItem) => {
        const { date, ...item } = currentItem;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
      }, {});

      setItems(reduced);
      setStartDate(initialDate);
    }
    getData();
  }, [reflectCtx.reflections]);

  function renderItem(item) {
    return (
      //   <TouchableOpacity
      //     style={{ marginRight: 10, marginTop: 17 }}
      //     onPress={itemClickHandler(item.id)}
      //   >
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={() => {
          navigation.navigate("Reflection View", {
            reflectionId: item.id,
          });
        }}
        // onPress={itemClickHandler(item.id)}
      >
        <Card style={{ marginRight: 10, marginTop: 17 }}>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                // margin: 10,
                // padding: 10,
              }}
            >
              <Text style={styles.timerText}>{item.title}</Text>
              <Avatar.Text label={item.slices} />
            </View>
          </Card.Content>
        </Card>
      </Pressable>
      //   </TouchableOpacity>
    );
  }

  //   function reflectHandler() {
  //     navigation.navigate("Reflect", {
  //       numOfSlices: slices,
  //       workDuration: workDuration,
  //       breakDuration: breakDuration,
  //     });
  //   }

  function itemClickHandler(id) {
    () => {
      navigation.navigate("Reflection View", {
        reflectionId: id,
      });
    };
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Agenda items={items} renderItem={renderItem} selected={startDate} />
    </SafeAreaView>
  );
}

export default ReflectionsAgenda;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
    // margin: 10,
  },
  timerText: {
    fontSize: 20,
    // fontWeight: "bold",
  },
  safe: {
    flex: 1,
    backgroundColor: "#fbc4ab",
  },
});
