import Api from './Api';

const url = "/tickets";

const createTicket = (values) => {
    //console.log(values);
    const body = {

        quantity: values.quantity,
        filmScheduleId: values.filmScheduleId
    }
    return Api.post(`${url}`, body);
}

const getAllTicketByUser = () => {

    return Api.get(`${url}/list`);
};
const deleteByscheduleId =(id)=>{
    return Api.delete(`${url}/${id}`);
}
// export
const api = {
    createTicket, getAllTicketByUser,deleteByscheduleId
}
export default api;