import { createContext, useReducer, useEffect, useState, useRef } from "react";
import { auth } from "../firebase/firebase-config";
import { db } from "../firebase/firebase-config";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import * as Notifications from "expo-notifications";
import { secFromToday } from "../navigation/MainContainer";

export const TaskContext = createContext({
  tasks: [],
  addTask: ({
    description,
    dueDate,
    complete,
    urgent,
    important,
    notificationId,
  }) => {},
  deleteTask: (id) => {},
  updateTask: (
    id,
    { description, dueDate, complete, urgent, important, notificationId }
  ) => {},
});

const adjustSettings2 = async (action, id) => {
  try {
    await setDoc(
      doc(db, "users", auth.currentUser.uid, "tasks", id), //can replace taskData.description with the task id
      {
        description: action.payload.description,
        dueDate: action.payload.dueDate,
        complete: action.payload.complete,
        urgent: action.payload.urgent,
        important: action.payload.important,
        notificationId: action.payload.notificationId,
      },
      { merge: true }
    );
  } catch (error) {
    console.error(error);
  }
};

//call below for UPDATE, the one above is for ADD
const adjustSettings3 = async (action) => {
  try {
    await setDoc(
      doc(db, "users", auth.currentUser.uid, "tasks", action.payload.id), //can replace taskData.description with the task id
      {
        description: action.payload.data.description,
        dueDate: action.payload.data.dueDate,
        complete: action.payload.data.complete,
        urgent: action.payload.data.urgent,
        important: action.payload.data.important,
        notificationId: action.payload.data.notificationId,
      },
      { merge: true }
    );
  } catch (error) {
    console.error(error);
  }
};

//call below for DISABLENOTIF
const adjustSettings4 = async (action) => {
  try {
    if (action.notificationId != -1) {
      Notifications.cancelAllScheduledNotificationsAsync(action.notificationId);
    }
    await setDoc(
      doc(db, "users", auth.currentUser.uid, "tasks", action.id),
      {
        description: action.description,
        dueDate: action.dueDate,
        complete: action.complete,
        urgent: action.urgent,
        important: action.important,
        notificationId: -1,
      },
      { merge: true }
    );
  } catch (error) {
    console.error(error);
  }
};

//call below for ENABLENOTIF
const adjustSettings5 = async (action) => {
  try {
    const sec = secFromToday(action.dueDate);
    if (sec != -1) {
      const identifier = Notifications.scheduleNotificationAsync({
        content: {
          title: action.description + " is due Tomorrow!",
        },
        trigger: { seconds: sec },
      });
      identifier.then((value) => {
        action.notificationId = value;
        setDoc(
          doc(db, "users", auth.currentUser.uid, "tasks", action.id),
          {
            description: action.description,
            dueDate: action.dueDate,
            complete: action.complete,
            urgent: action.urgent,
            important: action.important,
            notificationId: action.notificationId,
          },
          { merge: true }
        );
      });
    } else {
      action.notificationId = -1;
      setDoc(
        doc(db, "users", auth.currentUser.uid, "tasks", action.id),
        {
          description: action.description,
          dueDate: action.dueDate,
          complete: action.complete,
          urgent: action.urgent,
          important: action.important,
          notificationId: action.notificationId,
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.error(error);
  }
};

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASKS":
      return [...state, ...action.payload];
    case "ADD_INITIAL":
      return [{ ...action.payload, id: action.payload.id }, ...state];
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      adjustSettings2(action, id);
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableTaskIndex = state.findIndex(
        (tasks) => tasks.id === action.payload.id
      );
      const updatableTask = state[updatableTaskIndex];
      const updatedItem = { ...updatableTask, ...action.payload.data };
      const updatedTasks = [...state];
      updatedTasks[updatableTaskIndex] = updatedItem;
      adjustSettings3(action);
      return updatedTasks;
    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    case "DISABLENOTIF":
      for (let i = 0; i < state.length; i++) {
        adjustSettings4(state[i]);
      }
      return state;
    case "ENABLENOTIF":
      for (let i = 0; i < state.length; i++) {
        if (state[i].notificationId == -1) {
          adjustSettings5(state[i]);
        }
      }
      return state;
    case "RESET":
      return [];
    default:
      return state;
  }
}

const getUserTasks = async (userId) => {
  try {
    const tasksRef = collection(db, "users", userId, "tasks");
    const snapshot = await getDocs(tasksRef);

    const tasks = [];
    snapshot.forEach((doc) => {
      const taskData = doc.data();
      const task = {
        id: doc.id,
        ...taskData,
        dueDate: taskData.dueDate.toDate(), // Convert the dueDate field to a Date object
      };
      tasks.push(task);
    });

    return tasks;
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return [];
  }
};

function TaskContextProvider({ children }) {
  const [taskState, dispatch] = useReducer(taskReducer, []);
  const [userId, setUserId] = useState(null);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  async function registerForPushNotificationAsync() {
    let token;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "06e29322-27aa-48d1-b4d8-10d0f1c5fa44",
      })
    ).data;
  }

  useEffect(() => {
    registerForPushNotificationAsync().then((token) => setExpoPushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current = Notifications.addNotificationReceivedListener(
      (response) => {
        console.log(response);
      }
    );
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        dispatch({ type: "RESET" });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [deadlineNotif, setDeadlineNotif] = useState(false);
  const [alarmNotif, setAlarmNotif] = useState(false);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const tasks = await getUserTasks(userId);
          tasks.forEach((task) => {
            addTaskInitial(task); //stop generating a new ID, use the one already in the database!
          });
          // Do something with the tasks, such as updating the taskState using dispatch

          const docRef = doc(db, "users", auth.currentUser.uid);
          getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
              setDeadlineNotif(userData.deadlineNotif);
              setAlarmNotif(userData.alarmNotif);
            } else {
              console.log("No such document!");
            }
          });
        } catch (error) {
          console.error("ERROR IN USE EFFECT:", error);
        }
      };

      fetchData();
    }
  }, [userId]);

  function addTask(taskData) {
    if (taskData && typeof taskData === "object") {
      // Check if taskData is defined and an object
      const serializedTaskData = taskData.toJSON ? taskData.toJSON() : taskData;

      // Set the notification Id
      const sec = secFromToday(serializedTaskData.dueDate);
      if (sec != -1 && deadlineNotif) {
        const identifier = Notifications.scheduleNotificationAsync({
          content: {
            title: serializedTaskData.description + " is due Tomorrow!",
          },
          trigger: { seconds: sec },
        });
        identifier.then((value) => {
          serializedTaskData.notificationId = value;
          dispatch({ type: "ADD", payload: serializedTaskData });
        });
      } else {
        serializedTaskData.notificationId = -1;
        dispatch({ type: "ADD", payload: serializedTaskData });
      }
    }
  }

  //add a task to show on the list, but don't update the firebase
  function addTaskInitial(taskData) {
    if (taskData && typeof taskData === "object") {
      // Check if taskData is defined and an object
      const serializedTaskData = taskData.toJSON ? taskData.toJSON() : taskData;

      //dispatch({ type: 'ADD_TASKS', payload: [serializedTaskData] });
      dispatch({ type: "ADD_INITIAL", payload: serializedTaskData });
      // Adjust other settings if needed
    }
  }

  function deleteTask(id, taskData) {
    if (taskData.notificationId != -1) {
      Notifications.cancelScheduledNotificationAsync(taskData.notificationId);
    }
    const tasksRef = doc(db, "users", auth.currentUser.uid, "tasks", id);
    deleteDoc(tasksRef);
    dispatch({ type: "DELETE", payload: id });
  }

  //PS if you try to update one of the placeholder tasks,
  //there could be weird behavior. this is because the placeholder tasks aren't in the database!
  function updateTask(id, taskData) {
    // Delete old notification Id and set a new notification Id
    if (taskData.notificationId != -1) {
      Notifications.cancelAllScheduledNotificationsAsync(
        taskData.notificationId
      );
    }
    const sec = secFromToday(taskData.dueDate);
    if (sec != -1 && deadlineNotif) {
      const identifier = Notifications.scheduleNotificationAsync({
        content: {
          title: taskData.description + " is due Tomorrow!",
        },
        trigger: { seconds: sec },
      });
      identifier.then((value) => {
        taskData.notificationId = value;
        dispatch({ type: "UPDATE", payload: { id: id, data: taskData } });
      });
    } else {
      taskData.notificationId = -1;
      dispatch({ type: "UPDATE", payload: { id: id, data: taskData } });
    }
  }

  function cancelAllNotif() {
    setDeadlineNotif(false);
    dispatch({ type: "DISABLENOTIF" });
  }

  function enableAllNotif() {
    setDeadlineNotif(true);
    dispatch({ type: "ENABLENOTIF" });
  }

  function sendAlarmNotif() {
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setAlarmNotif(userData.alarmNotif);
          console.log("alarmNotif? ", alarmNotif);
          if (alarmNotif) {
            Notifications.scheduleNotificationAsync({
              content: {
                title: "Your timer just ended!",
              },
              trigger: { seconds: 1 },
            });
          }
        } else {
          console.log("No such document!");
        }
      });
    } catch (error) {
      console.error("ERROR IN sendAlarmNotif");
    }
  }

  const value = {
    tasks: taskState,
    addTask: addTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
    cancelAllNotif: cancelAllNotif,
    enableAllNotif: enableAllNotif,
    sendAlarmNotif: sendAlarmNotif,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export default TaskContextProvider;
