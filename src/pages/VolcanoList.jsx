import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Footer from '../components/footer';
import { Autocomplete, TextField, debounce } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import useNavigation from '../Helper/NavigationHelper';
import { fetchCountries, getVolcanoes } from '../Api/apiServices'



const VolcanoList = () => {
    document.title = 'Volcano List'
    const { navigateToVolcanoInfo } = useNavigation()

    const [countries, setCountries] = useState([]) //This is the state that will hold the data from the api call
    const [filteredCountries, setFilteredCountries] = useState([]) //This is the state that will hold the filtered data from the api call
    const [selectedCountry, setSelectedCountry] = useState(null) //This is the state that will hold the selected country

    const [radius, setRadius] = useState('') //This is the state that will hold the radius selected
    const [displayVolcano, setDisplayVolcano] = useState('') //This is the state that will hold the data from the api call
    const [rowData, setRowData] = useState([])
    const [colDefs, setColDefs] = useState([
        { field: 'name', headerName: 'Volcano Name', sortable: true, pagination: true }, //This is the column definition for the ag-grid
        { field: 'region', headerName: 'Region', sortable: true, pagination: true },
        {
            field: 'subregion', headerName: 'Subregion', sortable: true,
            pagination: true,
            filter: 'agTextColumnFilter',
            filterParams: {
                debounceMs: 0
            }
        }
    ])

    const handleChange = (e) => {
        const value = e.target.value
        setRadius(value === 'None' ? '' : value) //This will set the radius state to the value selected
    }


    useEffect(() => {
        const displayCountries = async () => {
            try {
                const data = await fetchCountries() //This will fetch the data from the api
                const formattedCountries = data.map((country) => ({ label: country })); //This will format the data to be used in the autocomplete
                setCountries(formattedCountries)
                setFilteredCountries(data) //This will set the data to the state
            } catch (error) {
                console.error(error)
            }
        }
        displayCountries()
    }, [])


    useEffect(() => {
        const getVolcanoId = async () => {
            if (selectedCountry) {
                try {
                    const data = await getVolcanoes(selectedCountry, radius) //This will fetch the data from the api
                    setDisplayVolcano(data) //This will set the data to the state
                    setRowData(data) //This will set the data to the state
                } catch (error) {
                    console.error(error)
                }
            }
        }
        getVolcanoId() //This will call the function
    }, [selectedCountry, radius])


    const handleCountryChange = (e, value) => {
        setSelectedCountry(value ? value.label : null) //This will set the selected country to the state
        if (!value) {
            setDisplayVolcano(null) //This will clear the data if the value is null
            setRowData([]) //This will clear the data if the value is null
            setRadius('') //This will clear the radius if the value is null
        }
    }



    return (
        <div className='volcano-list-container'>
            <div className='volcano-list-search'>
                <p>Please search a country to choose a volcano from: </p>
                <Autocomplete
                    className='auto-complete-list'
                    disablePortal options={countries}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                    onChange={handleCountryChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Choose a Country" variant='outlined' />
                    )}
                    style={{ width: 300, backgroundColor: 'white' }} />


            </div>
            <div className='volcano-list-drop'>
                <p>Population Density Radius: </p>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className='radius-container'>
                    <InputLabel id="demo-simple-select-standard-label">Radius</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={radius === '' ? 'None' : radius} //This will set the value of the select to the radius state
                        onChange={handleChange}
                        label="Radius"

                    >
                        <MenuItem value='None'>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value='5km'>5km</MenuItem>
                        <MenuItem value='10km'>10km</MenuItem>
                        <MenuItem value='30km'>30km</MenuItem>
                        <MenuItem value='100km'>100km</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className='volcano-list-table' >
                <div className="ag-theme-quartz" style={{ height: `500px` }} >
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        pagination={true}
                        animateRows={true}
                        paginationPageSize={20}
                        paginationPageSizeSelector={[10, 20, 30, 40]}
                        overlayLoadingTemplate='Please wait while we load in the data'
                        domLayout='normal'
                        onRowClicked={(e) => navigateToVolcanoInfo(e.data.id)}
                        overlayNoRowsTemplate='No data is being displayed at the moment, have 
                        you selected a country? If you have and there is still no data, then there is no data to display. 
                        Maybe try a different country or radius.'

                    />
                </div>

            </div>


        </div >

    )
}

export default VolcanoList