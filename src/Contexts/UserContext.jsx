//import necassary items for user context
import React, { createContext, useState, useEffect, useContext } from 'react'
import { jwtDecode } from 'jwt-decode';
import useNavigation from '../Helper/NavigationHelper';


const UserContext = createContext()

export const useAuth = () => useContext(UserContext) //This is the hook that will be used to access the context



export const AuthProvider = ({ children }) => { //This function will be used to provide the context to the children components
    const [loginUser, setLoginUser] = useState(null) //This is the state that will hold the login user 
    const [isAuthenticated, setIsAuthenticated] = useState(false) //This is the state that will hold the authentication status 
    const { navigateToLogin, navigateToHome } = useNavigation() //This is the function that will navigate to the login page

    useEffect(() => {
        const user = localStorage.getItem('loginUser') //This will get the user from the local storage
        if (user) {
            setLoginUser(JSON.parse(user))
            setIsAuthenticated(true) //This will set the user to the state and set the authentication status to true
            isTokenExpired(JSON.parse(user).token) //This will check if the token has expired

        }
    }, [])

    //function to calculate how long the token has been in the local storage/in session for
    const isTokenExpired = (token) => { //This function will check if the token has expired
        const decodedToken = jwtDecode(token) //This will decode the token 
        const currentTime = Math.floor(Date.now() / 1000) //This will get the current time
        const timeLeft = decodedToken.exp - currentTime //This will calculate the time left for the token to expire
        if (timeLeft <= 0) {
            logout() //This will logout the user if the token has expired
        }
        else {
            setTimeout(logout, timeLeft * 1000) //logout after the time left has elapsed
        }
    }


    const login = (loginUser) => { //This function will login the user and takes the user as an argument
        setLoginUser(loginUser) //This will set the user to the state 
        setIsAuthenticated(true)
        localStorage.setItem('loginUser', JSON.stringify(loginUser)) //This will set the user to the local storage
        console.log(localStorage)
        isTokenExpired(loginUser.token) //This will check if the token has expired
        navigateToHome() //This will navigate to the home page after the user has logged in

    }

    const logout = () => {
        clearTimeout()
        setLoginUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem('loginUser') //This will remove the user from the local storage
        localStorage.removeItem('email') //This will remove the email from the local storage
        localStorage.removeItem('volcanoHistory') //This will remove the volcano history from the local storage
        localStorage.clear(); //This will clear the local storage
        navigateToLogin()  //This will navigate to the login page
        console.log('you have been logged out')
    }
    return (
        <UserContext.Provider value={{ loginUser, login, logout, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContext;