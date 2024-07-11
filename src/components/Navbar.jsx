import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';
import { useAuth } from '../Contexts/UserContext';
import getGreetings from '../Helper/greeting';
import useNavigation from '../Helper/NavigationHelper';
import { fetchVolcanoesByCountry } from '../Api/apiServices';





const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('') //This is the state that will hold the search query
    const [volcanoes, setVolcanoes] = useState([]) //This is the state that will hold the data from the api call
    const { navigateToVolcanoInfo } = useNavigation()
    const { isAuthenticated, logout } = useAuth();



    //Trigger Api call. To have autocomplete work on the search bar we should at least start it with a couple of characters eg. 3
    useEffect(() => {
        if (searchQuery.length > 2) { //This will check if the search query is greater than 2 characters
            const getVolcanoData = async () => {
                try {
                    const data = await fetchVolcanoesByCountry(searchQuery) //This will fetch the data from the api 
                    setVolcanoes(data)
                }
                catch (error) {
                    console.error(error) //Under Construction but this will pop up as a error on the screen if the api call fails
                }
            };
            getVolcanoData()
        } else {
            setVolcanoes([]) //This will clear the autocomplete dropdown if the search query is less than 3 characters
        }
    }, [searchQuery])   //This will trigger the api call when the searchQuery state changes

    return (
        <div>
            <header className='header-navbar'>
                <nav className='nav'>

                    <label>{getGreetings()}</label>
                    <NavLink to='/' className='nav-link-home' >Home</NavLink>
                    <NavLink to='/volcanoes' className='nav-link' >List Of Volcanoes</NavLink>
                    {!isAuthenticated ? (<>
                        <NavLink to='/login' className='nav-link' >Login</NavLink>
                        <NavLink to='/register' className='nav-link' >Register</NavLink>
                    </>) : (<button onClick={logout} className='logout-btn'>Logout</button>)}



                    < div className='search-bar-container'>
                        <Autocomplete

                            freeSolo
                            // disablePortal
                            autoHighlight
                            className='autocomplete-list'
                            options={volcanoes}
                            getOptionLabel={(option) => option.name + ', ' + option.country}
                            renderInput={(params) => (
                                <TextField {...params}
                                    label="Search a Country"
                                    variant='outlined'
                                    sx={{ border: 'none', "& fieldset": { border: 'none' }, }}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} />
                            )}
                            onChange={(e, value) => {

                                if (value) {
                                    setSearchQuery(value.name)
                                    navigateToVolcanoInfo(value.id)
                                }
                            }}
                            style={{
                                width: 300,
                                backgroundColor: 'white',
                                borderRadius: '25px',
                                border: '3px solid',
                                textDecoration: 'none',
                                cursor: 'pointer'
                            }}
                        />

                    </div>

                </nav>

            </header>


        </div >
    )
}

export default Navbar