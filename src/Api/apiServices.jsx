import { Endpoints } from './endpoints';

export const fetchVolcanoesByCountry = async (country) => { //This is the function that will fetch the data from the api
    const url = `${Endpoints.volcanoes}` + country; //This is the url that will be used to fetch the data from the api
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
    }
    return await response.json(); //This will return the data in json format
};

export const fetchCountries = async () => {
    const url = `${Endpoints.countries}`; //This is the url that will be used to fetch the data from the api
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
    }
    return await response.json();
};

export const registerUser = async (storeUser) => { //This is the function that will register a new user
    const response = await fetch(Endpoints.register, { //This is the endpoint that will be used to register a new user
        method: 'POST', //This is the method that will be used to send the data
        headers: { //This is the header that will be used to send the data
            'Content-Type': 'application/json' //This is the content type that will be used to send the data
        },
        body: JSON.stringify(storeUser) //This is the data that will be sent
    })
    const data = await response.json();
    return {
        status: response.status, //This will return the status
        data: data //This will return the data
    }
};

export const loginUser = async (credentials) => {
    const response = await fetch(Endpoints.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    const data = await response.json();
    return {
        status: response.status,
        data: data
    }
};

export const fetchVolcanoById = async (id, token) => { //This is the function that will fetch the data from the api by id 
    const headers = { //This is the header that will be used to fetch the data
        'Content-Type': 'application/json'
    }
    if (token) { //This will check if the token is present 
        headers['Authorization'] = `Bearer ${token}` //This will set the token in the header 
    }
    const response = await fetch(Endpoints.volcanoId(id), { //This is the endpoint that will be used to fetch the data
        headers: headers //This is the header that will be used to fetch the data
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
    }
    return await response.json();

}


export const getVolcanoes = async (country, radius) => {
    const url = Endpoints.getVolcanoes(country, radius)
    const response = await fetch(url)
    console.log("Fetching data from URL:", url);
    if (!response.ok) {
        throw new Error('Something went wrong ' + response.statusText)
    }
    return await response.json()
}
