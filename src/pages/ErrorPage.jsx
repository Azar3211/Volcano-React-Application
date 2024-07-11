import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import errorImage from '../assets/8pcnq0.gif'


//when the user enters this error page they will be redirected to the home page after 5 seconds

//this is the error page that will be displayed when the user enters a wrong url
//this page will troll them and then redirect them to the home page
const ErrorPage = () => {
    const navigate = useNavigate() //This is the function that will navigate the user to the home page
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/')
        }, 10000); //This will redirect the user to the home page after 10 seconds

        return () => clearTimeout(timer) //This will clear the timer
    }, [])
    return (


        <div className='error-container'>

            <h1>404 Page not found</h1>
            <h2>Woah What is This. You found the secret page thats not so secret, how you going to mess up like that  cant believe you got the url
                wrong. <br />Anyway here is a meme to keep you occupied until you get redirected to the home page. <br />ps (i made it myself)
            </h2>
            <img src={errorImage} alt='error' />

            <h3>Redirecting to Home Page</h3>




        </div >
    )
}

export default ErrorPage