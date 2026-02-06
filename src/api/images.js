import axios from "axios";
const baseUrl = 'https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/';

const getPersoneImage = (uid) => {
    return `${baseUrl}${uid}.jpg`;
}

const getPersoneImagesForPage = async (items) => {
    const promises = items.map(async item => {
        const res = await fetch(`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${item.uid}.jpg`);
        return res.url;
    });
    return await Promise.all(promises);
};

export { getPersoneImage, getPersoneImagesForPage }