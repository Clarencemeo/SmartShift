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
        date: "5/25/2023",
        dateTime: "5/25/2023 4:35 pm",
    },
    {
        id: `2`,
        title: 'Test2',
        workingTime: 25*60,
        breakTime: 5*60,
        slices: 1,
        reflection: 'Test reflection 2',
        date: "5/27/2023",
        dateTime: "5/27/2023 4:35 pm",
    },
];

export const ReflectContext = createContext({
    reflections: [],
    addReflection: ({ title, workingTime, breakTime, slices, reflection, date, dateTime })  => {},
    deleteReflection: (id) => {},
});

function reflectReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            // console.log("inside add in context");
            // console.log(action.payload);
            return [{...action.payload, id: id}, ...state];
        case 'DELETE':
            return state.filter((reflection) => reflection.id !== action.payload);
        default: 
            return state;
    }
}

function ReflectContextProvider({children}) {
    // const [reflectState, dispatch] = useReducer(reflectReducer);
    const [reflectState, dispatch] = useReducer(reflectReducer, DUMMY_REFLECTIONS);

    function addReflection(reflectData) {
        dispatch({ type: 'ADD', payload: reflectData});
    }

    function deleteReflection(id) {
        dispatch({ type: 'DELETE', payload: id});
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