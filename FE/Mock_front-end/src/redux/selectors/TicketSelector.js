import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const ticketSelector = (state) => state.Ticket;

const selectTicketSelector = createSelector(
    ticketSelector,
    state => state.tickets);



/** function */
export const selectTickets = (state) => {
    return selectTicketSelector(state);
}

