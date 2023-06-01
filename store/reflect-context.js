import { createContext, useReducer, useEffect, useState } from "react";
import { auth } from '../firebase/firebase-config'
import { db } from '../firebase/firebase-config'
import { collection, onSnapshot, getDocs, doc, setDoc, deleteDoc, addDoc } from 'firebase/firestore/lite'

const DUMMY_REFLECTIONS = [
    {
        id: `1`,
        title: 'Test1',
        workingTime: 20*60,
        breakTime: 4*60,
        slices: 1,
        reflection: 'Test reflection 1',
        date: "2023-05-29",
        dateTime: "5/25/2023 4:35 pm",
    },
    {
        id: `2`,
        title: 'Test2',
        workingTime: 25*60,
        breakTime: 5*60,
        slices: 1,
        reflection: 'Test reflection 2',
        date: "2023-05-30",
        dateTime: "5/27/2023 4:35 pm",
    },
    {
        id: `3`,
        title: 'Test3',
        workingTime: 25*60,
        breakTime: 5*60,
        slices: 1,
        reflection: 'Test reflection 3',
        date: "2023-05-30",
        dateTime: "5/27/2023 4:35 pm",
    },
];

export const ReflectContext = createContext({
    //date is what shows for calendar
    //dateTime is what shows at the top
    reflections: [],
    addReflection: ({ title, workingTime, breakTime, slices, reflection, date, dateTime })  => {},
    deleteReflection: (id) => {},
});

const addReflectionsToDatabase = async (action, id) => {
    try {
      await setDoc(
        doc(db, 'users', auth.currentUser.uid, 'reflections', id),
        {
          title: action.payload.title,
          workingTime: action.payload.workingTime,
          breakTime: action.payload.breakTime,
          slices: action.payload.slices,
          reflection: action.payload.reflection,
          date: action.payload.date,
          time: action.payload.dateTime
        },
        { merge: true }
      );
    } catch (error) {
      console.error(error);
    }
};

const getReflections = async (userId) => {
    try {
      const reflectionsRef = collection(db, 'users', userId, 'reflections');
      const snapshot = await getDocs(reflectionsRef);
  
      const reflections = [];
      snapshot.forEach((doc) => {
        const reflectionData = doc.data();
        const reflection = {
          id: doc.id,
          ...reflectionData,
          dateTime: reflectionData.time
        };
        console.log(reflection)
        reflections.push(reflection);
      });
  
      return reflections;
    } catch (error) {
      console.error('Error retrieving reflections:', error);
      return [];
    }
  };
  

function reflectReducer(state, action) {
    switch (action.type) {
        case 'ADD_INITIAL':
            return [{ ...action.payload, id: action.payload.id }, ...state]
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            addReflectionsToDatabase(action, id);
            return [...state, {...action.payload, id: id}];
        case 'DELETE':
            return state.filter((reflection) => reflection.id !== action.payload);
        case 'RESET':
            return [];
        default: 
            return state;
    }
}

function ReflectContextProvider({children}) {
    // const [reflectState, dispatch] = useReducer(reflectReducer);
    const [reflectState, dispatch] = useReducer(reflectReducer, DUMMY_REFLECTIONS);
    const [userId, setUserId] = useState(null);
    //this first useEffect is responsible for resetting 
    //the display of the task list whenever the user logs out. 
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
  
    //this second useEffect fetches the data from the database 
    useEffect(() => {
      if (userId) {
        const fetchData = async () => {
          try {
            const reflections = await getReflections(userId);
            reflections.forEach((reflection) => {
              addReflectionInitial(reflection); //stop generating a new ID, use the one already in the database! 
            });
          } catch (error) {
            console.error('ERROR IN USE EFFECT:', error);
          }
        };
  
        fetchData();
      }
    }, [userId]);

    //function addReflection(reflectData) {
    //    dispatch({ type: 'ADD', payload: reflectData});
    //}

    function addReflection(reflectData) {
        if (reflectData && typeof reflectData === 'object') {
          // Check if taskData is defined and an object
          const serializeReflectData = reflectData.toJSON ? reflectData.toJSON() : reflectData;
          dispatch({ type: 'ADD', payload: serializeReflectData });
          // Adjust other settings if needed
        }
      }

    function addReflectionInitial(reflectData) {
        if (reflectData && typeof reflectData === 'object') {
          // Check if taskData is defined and an object
          const serializeReflectData = reflectData.toJSON ? reflectData.toJSON() : reflectData;
          dispatch({ type: 'ADD_INITIAL', payload: serializeReflectData });
        }
      }

    //function deleteReflection(id) {
    //    dispatch({ type: 'DELETE', payload: id});
    //}

    function deleteReflection(id) {
        const reflectionsRef = doc(db, 'users', auth.currentUser.uid, 'reflections', id);
        deleteDoc(reflectionsRef)
        dispatch({ type: 'DELETE', payload: id });
      }

    const value = {
        reflections: reflectState,
        addReflection: addReflection,
        deleteReflection: deleteReflection, 
    };

    return (
        <ReflectContext.Provider value = {value}>
            {children}
        </ReflectContext.Provider>
    );
}

export default ReflectContextProvider; 