import { createContext, useReducer, useEffect, useState } from "react";
import { auth } from "../firebase/firebase-config";
import { db } from "../firebase/firebase-config";
import {
  collection,
  onSnapshot,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore/lite";

export const TaskContext = createContext({
  tasks: [],
  addTask: ({
    description,
    dueDate,
    complete,
    urgent,
    important,
    completedDate,
    notificationId,
  }) => {},
  deleteTask: (id) => {},
  updateTask: (
    id,
    {
      description,
      dueDate,
      complete,
      urgent,
      important,
      completedDate,
      notificationId,
    }
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
        completedDate: action.payload.complete
          ? new Date().toLocaleDateString()
          : null,
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
        completedDate: action.payload.data.complete
          ? new Date().toLocaleDateString()
          : null,
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
        completedDate: action.complete ? new Date().toLocaleDateString() : null,
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
            completedDate: action.complete
              ? new Date().toLocaleDateString()
              : null,
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
          completedDate: action.complete
            ? new Date().toLocaleDateString()
            : null,
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
    //case 'ADD_TASKS':
    //  return [...state, ...action.payload];
    //This adds a task to the task display, but does not update the firebase
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
  //this first useEffect is responsible for resetting
  //the display of the task list whenever the user logs out.
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

  //this second useEffect fetches the data from the database
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const tasks = await getUserTasks(userId);
          tasks.forEach((task) => {
            addTaskInitial(task); //stop generating a new ID, use the one already in the database!
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
      dispatch({ type: "ADD", payload: serializedTaskData });
      // Adjust other settings if needed
    }
  }

  //add a task to show on the list, but don't update the firebase.
  //This is for when users log back in and we want to show the tasks that already exist.
  function addTaskInitial(taskData) {
    if (taskData && typeof taskData === "object") {
      // Check if taskData is defined and an object
      const serializedTaskData = taskData.toJSON ? taskData.toJSON() : taskData;
      dispatch({ type: "ADD_INITIAL", payload: serializedTaskData });
    }
  }

  function deleteTask(id) {
    const tasksRef = doc(db, "users", auth.currentUser.uid, "tasks", id);
    deleteDoc(tasksRef);
    dispatch({ type: "DELETE", payload: id });
  }

  function updateTask(id, taskData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: taskData } });
  }

  const value = {
    tasks: taskState,
    addTask: addTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export default TaskContextProvider;
