import * as types from "../constants";

export function getListTicketAction(tickets,schedule) {
  return {
    type: types.GET_LIST_TICKET,
    payload: tickets
  };
};
