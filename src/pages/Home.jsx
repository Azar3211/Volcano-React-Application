import React, { useEffect, useState, useRef, createContext, useContext } from 'react'
import useNavigation from '../Helper/NavigationHelper';
import { useAuth } from '../Contexts/UserContext';
import { VolcanoHistoryContext } from '../Contexts/VolcanoHistoryContext';
import { Link } from 'react-router-dom';


const Home = () => {
    document.title = 'Home Page'
    const { volcanoHistory } = useContext(VolcanoHistoryContext) //get the volcano history from the context
    const { navigateToRegister, navigateToVolcanoes } = useNavigation() //get the navigation functions from the helper
    const { isAuthenticated, logout } = useAuth(); //get the isAuthenticated and logout functions from the context

    const userEmailName = localStorage.getItem('email') //get the email from the local storage
    let name = '' //initialize the name variable
    if (userEmailName) {
        name = userEmailName.split('@')[0]
        name = name.toUpperCase() //get the name from the email
    }
    return (
        <div>
            <div className='home-page'>
                <div className='home-message'>
                    {!isAuthenticated ? (<>
                        <h1 className='intro-message'>Welcome to Volcano Tracker</h1>

                        <h3 className='intro-message1'>Here you can find information about volcanoes around the world. <br />Please Register
                            to gain  full access to the information available for each volcano.<br /> Otherwise feel free to have a browse.</h3>
                    </>) :
                        (<>
                            <h1 className='intro-message'>Welcome back to the Volcano Tracker {name}</h1>
                            <h3 className='intro-message1'>Begin Finding your Desired Volcanos Now.<br /> Press the Button below to begin, or
                                use one of the methods above to search.</h3>
                        </>)}
                </div>
                <div className='home-btns'>
                    <button className='home-explore' onClick={navigateToVolcanoes}>Browse</button>
                    {!isAuthenticated ? (
                        <button className='home-signup-btn' onClick={navigateToRegister}> Register</button>) : null}

                </div>

                <div>
                    {isAuthenticated ? //if the user is authenticated, show the history
                        <div className='history-container'>
                            <h2>Previously viewed Volcanoes</h2>
                            <p>Click on the previous volcano names to go back to that page:</p>
                            <ul className='history-links'>
                                {volcanoHistory.slice(-4).map((volcano, index) => { //show the last 4 volcanoes in the history
                                    return (
                                        <li key={index}>
                                            <Link to={`/volcanoes/${volcano.id}`}>{volcano.name}</Link>
                                        </li> //link to the volcano page
                                    )
                                })}
                            </ul>
                        </div>
                        : null}
                </div>


            </div>


        </div >
    )
}

export default Home