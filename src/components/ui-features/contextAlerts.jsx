import { createContext } from "react";

const alertContext = createContext({
    setAlertMessage: (type, message) => { } //This is the function that will set the alert message

});

export default alertContext;