import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const scheduleSelector = (state) => state.Schedule;

const selectScheduleSelector = createSelector(
    scheduleSelector,
    state => state.schedules);
const selectPageSelector = createSelector(
    scheduleSelector,
    state => state.page);
    
 const selectSizeSelector = createSelector(
    scheduleSelector,
    state => state.size);
    
const selectTotalSizeSelector = createSelector(
    scheduleSelector,
    state => state.totalSize);

const selectSelectedRowsSelector = createSelector(
    scheduleSelector,
    state => state.selectedRows);
/** function */
export const selectSchedules = (state) => {
    return selectScheduleSelector(state);
}
export const selectPage = (state) => {
    return selectPageSelector(state);
}

export const selectSize = (state) => {
    return selectSizeSelector(state);
}

export const selectTotalSize = (state) => {
    return selectTotalSizeSelector(state);
}

export const selectSelectedRows = (state) => {
    return selectSelectedRowsSelector(state);
}