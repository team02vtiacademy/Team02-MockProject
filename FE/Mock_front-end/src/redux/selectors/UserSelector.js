import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const userSelector = (state) => state.User;

const selectUserSelector = createSelector(
    userSelector,
    state => state.users);
const selectPageSelector = createSelector(
    userSelector,
    state => state.page);
    
 const selectSizeSelector = createSelector(
    userSelector,
    state => state.size);
    
const selectTotalSizeSelector = createSelector(
    userSelector,
    state => state.totalSize);

const selectSelectedRowsSelector = createSelector(
    userSelector,
    state => state.selectedRows);
/** function */
export const selectUsers = (state) => {
    return selectUserSelector(state);
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