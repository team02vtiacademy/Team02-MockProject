import Api from './Api';
import scheduleAPI from "./ScheduleApi";

const url = "/films";


const getAllFilm = () => {

    // const parameters = {
    //     page,
    //     size,
    //     sort: `${sortField},${sortType}`
    // }

    // // search
    // if (search) {
    //     parameters.search = search;
    // }

    // // filter
    // if (minTotalMember !== null && minTotalMember !== undefined) {
    //     parameters.minTotalMember = minTotalMember;
    // }

    // if (maxTotalMember !== null && maxTotalMember !== undefined) {
    //     parameters.maxTotalMember = maxTotalMember;
    // }

    return Api.get(`${url}`);
};

// const existsByName = (name) => {
//     return Api.get(`${url}/name/${name}`);
// };

// const create = (name) => {

//     const body = {
//         name
//     }

//     return Api.post(url, body);
// };

// const getById = (id) => {
//     return Api.get(`${url}/${id}`);
// };

// const update = (id, name, totalMember) => {

//     const body = {
//         name,
//         totalMember
//     }

//     return Api.put(`${url}/${id}`, body);
// };

// const deleteByIds = (ids) => {
//     return Api.delete(`${url}/${ids.toString()}`);
// };

// export
const createFilm = (values) => {
    const body = {
        name: values.name,
        directors: values.directors,
        actors: values.actors,
        genre: values.genre,
        duration: values.duration,
        description: values.description,
        ticketPrice: values.ticketPrice,
        poster: values.poster,
        releaseDate: values.releaseDate
    }

    const f = () => {
        Api.post(`${url}`, body)
        .then((response) => {
            //console.log(response);
            let id = response;
            scheduleAPI.createSchedulesInFilm(id, values.filmSchedules);
        })
        .catch((error) => {
            console.log(error);
            throw error;
        })
    }
    f();
}

const updateFilm = (values) => {
    const body = {
        filmId: values.filmId,
        name: values.name,
        directors: values.directors,
        actors: values.actors,
        genre: values.genre,
        duration: values.duration,
        description: values.description,
        ticketPrice: values.ticketPrice,
        poster: values.poster,
        //releaseDate: values.releaseDate
    }
    const f = () => {
        Api.put(`${url}/${values.filmId}`, body)
        .then(() => {
            //console.log(response);
            let newSchedules = values.filmSchedules;
            scheduleAPI.updateFilmSchedules(values.filmId, newSchedules);
        })
        .catch((error) => {
            console.log(error);
            throw error;
        })
    }
    f();
}
const getFilmById = (id)  => {
    return Api.get(`${url}/${id}`);
}

const deleteFilm = (id) => {
    return Api.delete(`${url}/${id}`);
}
const api = { getAllFilm, createFilm, getFilmById, updateFilm, deleteFilm}
export default api;