import { createContext, useReducer, useEffect, useState } from "react";
import {auth} from '../firebase/firebase-config'
import {db} from '../firebase/firebase-config'
import {collection, onSnapshot, getDocs, doc, setDoc, deleteDoc, addDoc} from 'firebase/firestore/lite'


const DUMMY_TASKS = [
    {
        id: 't1',
        description: 'work on CSE 115A',
        dueDate: new Date('2023-04-30'),
        complete: false,
        urgent: false,
        important: false, 
    },
    {
        id: 't2',
        description: 'work on CSE 108',
        dueDate: new Date('2023-05-01'),
        complete: false,
        urgent: false,
        important: false,
    },
    {
        id: 't3',
        description: 'work on CSE 183',
        dueDate: new Date('2023-05-02'),
        complete: false,
        urgent: false,
        important: false,
    },
    {
        id: 't4',
        description: 'work on project',
        dueDate: new Date('2023-05-03'),
        complete: false,
        urgent: false,
        important: false,
    },
    {
        id: 't5',
        description: 'work on other project',
        dueDate: new Date('2023-05-04'),
        complete: true,
        urgent: false,
        important: false,
    },
    {
        id: 't6',
        description: 'work on CSE 108',
        dueDate: new Date('2023-05-01'),
        complete: true,
        urgent: false,
        important: false,
    },
    {
        id: 't7',
        description: 'work on CSE 183',
        dueDate: new Date('2023-05-02'),
        complete: false,
        urgent: false,
        important: false,
    },
    {
        id: 't8',
        description: 'work on project',
        dueDate: new Date('2023-05-03'),
        complete: true,
        urgent: false,
        important: false,
    },
    {
        id: 't9',
        description: 'work on other project',
        dueDate: new Date('2023-05-04'),
        complete: false,
        urgent: false,
        important: false,
    },
]


export const TaskContext = createContext({
    tasks: [],
    addTask: ({description, dueDate, complete, urgent, important}) => {},
    deleteTask: (id) => {},
    updateTask: (id, {description, dueDate, complete, urgent, important}) => {}, 
});



const adjustSettings2 = async (action, id) => {
    try {
      await setDoc(
        doc(db, 'users', auth.currentUser.uid, 'tasks', id), //can replace taskData.description with the task id 
        { 
          description: action.payload.description,
          dueDate: action.payload.dueDate,
          complete: action.payload.complete,
          urgent: action.payload.urgent,
          important: action.payload.important,
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
        doc(db, 'users', auth.currentUser.uid, 'tasks', action.payload.id), //can replace taskData.description with the task id 
        { 
          description: action.payload.data.description,
          dueDate: action.payload.data.dueDate,
          complete: action.payload.data.complete,
          urgent: action.payload.data.urgent,
          important: action.payload.data.important,
        },
        { merge: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  

function taskReducer(state, action) {
    switch (action.type) {
        case 'ADD_TASKS':
            return [...state, ...action.payload];
        case 'ADD_INITIAL':
            return [{ ...action.payload, id: action.payload.id }, ...state]
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            adjustSettings2(action, id)
            console.log(action)
            return [{ ...action.payload, id: id }, ...state]
        case 'UPDATE':
            const updatableTaskIndex = state.findIndex(
                (tasks) => tasks.id === action.payload.id
            );
            const updatableTask = state[updatableTaskIndex];
            const updatedItem = { ...updatableTask, ...action.payload.data };      
            const updatedTasks = [...state];
            updatedTasks[updatableTaskIndex] = updatedItem; 
            console.log("YO")
            console.log(action.payload.id)
            console.log(action.payload.data.description)
            adjustSettings3(action)
            return updatedTasks;
        case 'DELETE':
            return state.filter((task) => task.id !== action.payload);
        case 'RESET':
                return DUMMY_TASKS;
        default:
            return state;
    }
}


const getUserTasks = async (userId) => {
    try {
      const tasksRef = collection(db, 'users', userId, 'tasks');
      const snapshot = await getDocs(tasksRef);
  
      const tasks = [];
      snapshot.forEach((doc) => {
        const taskData = doc.data();
        const task = {
          id: doc.id,
          ...taskData,
          dueDate: taskData.dueDate.toDate() // Convert the dueDate field to a Date object
        };
        tasks.push(task);
      });
  
      return tasks;
    } catch (error) {
      console.error('Error retrieving tasks:', error);
      return [];
    }
  };

  

function TaskContextProvider({children}) {
    
    const[taskState, dispatch] = useReducer(taskReducer, DUMMY_TASKS);
    const [userId, setUserId] = useState(null);
    //const userId = auth.currentUser.uid;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setUserId(user.uid);
          } else {
            setUserId(null);
            dispatch({ type: 'RESET' });
          }
        });
    
        return () => {
          unsubscribe();
        };
      }, []);
    
    useEffect(() => {
        if (userId) {
            console.log("reading")
            const fetchData = async () => {
            try {
              const tasks = await getUserTasks(userId);
              console.log('User tasks:', tasks);
              tasks.forEach((task) => {
                addTaskInitial(task); //stop generating a new ID, use the one already in the database! 
              });
              //dispatch({ type: 'ADD_TASKS', payload: tasks });
              // Do something with the tasks, such as updating the taskState using dispatch
            } catch (error) {
                console.error('reached here');
                console.error('ERROR IN USE EFFECT:', error);
            }
          };
    
          fetchData();
        }
      }, [userId]);


    function addTask(taskData) {
        if (taskData && typeof taskData === 'object') {
          // Check if taskData is defined and an object
          const serializedTaskData = taskData.toJSON ? taskData.toJSON() : taskData;
          //dispatch({ type: 'ADD_TASKS', payload: [serializedTaskData] });
          dispatch({type: 'ADD', payload: serializedTaskData});
          // Adjust other settings if needed
        }
      }

    //add a task to show on the list, but don't update the firebase
    function addTaskInitial(taskData) {
        if (taskData && typeof taskData === 'object') {
          // Check if taskData is defined and an object
          const serializedTaskData = taskData.toJSON ? taskData.toJSON() : taskData;
          //dispatch({ type: 'ADD_TASKS', payload: [serializedTaskData] });
          dispatch({type: 'ADD_INITIAL', payload: serializedTaskData});
          // Adjust other settings if needed
        }
      }

    function deleteTask(id) {
        const tasksRef = doc(db, 'users', auth.currentUser.uid, 'tasks', id);
        deleteDoc(tasksRef)
        dispatch({type: 'DELETE', payload: id});
    }

    //PS if you try to update one of the placeholder tasks,
    //there could be weird behavior. this is because the placeholder tasks aren't in the database! 
    function updateTask(id, taskData) {
        dispatch({type: 'UPDATE', payload: {id: id, data: taskData}});
    }

    const value = {
        tasks: taskState,
        addTask: addTask,
        deleteTask: deleteTask,
        updateTask: updateTask
    };

    return (
        <TaskContext.Provider value = {value}>
            {children}
        </TaskContext.Provider>
    );
}

export default TaskContextProvider;