import Api from './Api';

const url = "/film-schedules";
const createUrl = "/create-for-film";

const getAllSchedules = (page = 1, size = 10, sortField = 'scheduleId', sortType = 'desc') => {

    const parameters = {
        page,
        size,
        sort: `${sortField},${sortType}`
    }

    // // search
    // if (search) {
    //     parameters.search = search;
    // }



    return Api.get(`${url}`, { params: parameters });
};

const getByDate = (date) => {
    let d1 = `${date.getUTCFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    date.setDate(date.getDate() + 1);
    let d2 = `${date.getUTCFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const parameters = {
        minTimeSlot: d1,
        maxTimeSlot: d2
    }
    return Api.get(`${url}`, { params: parameters });
};

// const create = (name) => {

//     const body = {
//         name
//     }

//     return Api.post(url, body);
// };

// const getById = (id) => {
//     return Api.get(`${url}/${id}`);
// };


const deleteByscheduleIds = (scheduleIds) => {
    return Api.delete(`${url}/${scheduleIds.toString()}`);
};

const getSchedulesByFilmId = (id) => {
    return Api.get(`${url}/list/${id}`);
}

const createScheduleInFilm = (filmId, values) => {
    //console.log(values);
    const body = {
        filmId: filmId,
        seatNumber: values.seatNumber,
        timeSlot: values.timeSlot
    }
    return Api.post(`${url}${createUrl}`, body);
}

const createSchedulesInFilm = (filmId, schedules) => {
    const promises = schedules.map((element) => {
        console.log(element);
        return createScheduleInFilm(filmId, element);
    });
    Promise.all([...promises]).then((response) => {

    })
    .catch((error) => {
        console.log(error);
        throw error;
    })
}
// export

const updateFilmSchedule = (newSchedule) => {
    const body = {
        timeSlot: newSchedule.timeSlot,
        seatNumber: newSchedule.seatNumber
    }
    Api.put(`${url}/${newSchedule.scheduleId}`, body);
    
}

const updateFilmSchedules = async (filmId, newSchedules) => {
    try {
        let oldSchedules = await getSchedulesByFilmId(filmId);
        oldSchedules.forEach(old => {
            let check = false;
            newSchedules.forEach(new_ => {
                if (old.scheduleId == new_.scheduleId) check = true;
            });
            if (!check) deleteByscheduleIds(old.scheduleId);
        });

        newSchedules.forEach(element => {
            //console.log(element);
            if (element.scheduleId == -1) {
                createScheduleInFilm(filmId, element);
            } else {
                updateFilmSchedule(element);
            }
        });
        
    } catch (error) {
        throw error;
    }

}


const api = { getAllSchedules, deleteByscheduleIds, 
getSchedulesByFilmId, createScheduleInFilm, createSchedulesInFilm, 
updateFilmSchedule, updateFilmSchedules, getByDate}
export default api;