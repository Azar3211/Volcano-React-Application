import React from "react";
import { createContext, useState, useEffect } from "react";

export const VolcanoHistoryContext = createContext(); //This creates a context object that will be used to pass the volcano

export const VolcanoHistoryProvider = ({ children }) => {  //This function will be used to provide the context to the children components
    const [volcanoHistory, setVolcanoHistory] = useState( //This will be used to store the history of the volcanoes that the user has visited
        JSON.parse(localStorage.getItem("volcanoHistory")) || []); //This will get the history of the volcanoes that the user has visited from the local storage


    useEffect(() => {
        localStorage.setItem('volcanoHistory', JSON.stringify(volcanoHistory));
    }, [volcanoHistory]); //This will set the history of the volcanoes that the user has visited to the local storage

    return (
        <VolcanoHistoryContext.Provider value={{ volcanoHistory, setVolcanoHistory }}>
            {children}
        </VolcanoHistoryContext.Provider>
    );
}
