import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState, useEffect } from 'react';
import alertContext from './contextAlerts';



const AlertPopUp = ({ children }) => {
    const [popUpOpen, setPopUpOpen] = useState(false) //This is the state that will hold the pop up open status
    const [alert, setAlert] = useState()
    const [alertType, setAlertType] = useState('')

    useEffect(() => {
        if (alert) { //This will check if the alert is true or not
            setPopUpOpen(true) //This will set the pop up to open
            const timer = setTimeout(() => { //This will set a timer to close the pop up after 5 seconds
                setPopUpOpen(false)

            }, 5000);
            return () => clearTimeout(timer) //This will clear the timer
        }
    }, [alert])


    const closePopUp = () => {
        setPopUpOpen(false)
    };

    const setAlertMessage = (type, message) => { //This is the function that will set the alert message
        setAlertType(type)
        setAlert(message)
        setPopUpOpen(true) //This will set the pop up to open
    }

    return (
        <alertContext.Provider value={{ setAlertMessage }}>
            {children}
            <Snackbar open={popUpOpen} autoHideDuration={6000} onClose={closePopUp} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                style={{ marginLeft: '100px' }}>
                <Alert variant="filled" severity={alertType} onClose={closePopUp}>
                    {alert}
                </Alert>
            </Snackbar>
        </alertContext.Provider>
    )
}

export default AlertPopUp;



