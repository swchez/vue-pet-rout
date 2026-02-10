import axios from "axios";
const baseUrl = 'https://www.swapi.tech/api';

const peopleUrl = `${baseUrl}/people/`;
const filmsUrl = `${baseUrl}/films/`;
const planetUrl = `${baseUrl}/planets/`;

// персонажи
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
//планеты
const getPlanetById = (id) => {
    return axios.get(`${planetUrl}${id}`);
};
const getPlanets = (page,limit) => {
    return axios.get(planetUrl,{
        params: {
            page,
            limit
        }
    });
};
//фильмы
const getFilms = (url) => {
    return axios.get(`${filmsUrl}${url}`);
};
//урл
const getByurl = (url) => {
    return axios.get(url);
}

export { getPersones, getPersoneById, getFilms, getPlanets, getByurl, getPlanetById }