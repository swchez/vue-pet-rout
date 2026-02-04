import axios from "axios";
const baseUrl = 'https://www.swapi.tech/api';

const peopleUrl = `${baseUrl}/people/`;
const filmsUrl = `${baseUrl}/films/`;
const planetUrl = `${baseUrl}/planets/`;


const getPersoneById = (id) => {
    return axios.get(`${peopleUrl}${id}`);
};
const getPersones = (page,limit) => {
    return axios.get(peopleUrl,{
        params: {
            page,
            limit
        }
    });
};
const getFilms = (url) => {
    return axios.get(`${filmsUrl}${url}`);
};
const getPlanets = (url) => {
    return axios.get(`${planetUrl}${url}`);
};
const getByurl = (url) => {
    return axios.get(url);
}

export { getPersones, getPersoneById, getFilms, getPlanets, getByurl }