const baseUrl = `http://4.237.58.241:3000`

export const Endpoints = {
    volcanoes: `${baseUrl}/volcanoes?country=`, //This is the endpoint for getting the list of volcanoes
    countries: `${baseUrl}/countries`, //This is the endpoint for getting the list of countries
    register: `${baseUrl}/user/register`, //This is the endpoint for registering a new user
    login: `${baseUrl}/user/login`, //This is the endpoint for logging in a user
    volcanoId: (id) => `${baseUrl}/volcano/${id}`, //This is the endpoint for getting the details of a volcano by its id
    getVolcanoes: (country, radius) => {
        let url = `${baseUrl}/volcanoes?country=${country}`
        if (radius) {
            url += `&populatedWithin=${radius}`
        } //This is the endpoint for getting the list of volcanoes by country and radius 
        return url //This will return the url
    }
}