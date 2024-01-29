import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const filmSelector = (state) => state.Film;

const selectFilmSelector = createSelector(
    filmSelector,
    state => state.films);
// const selectPageSelector = createSelector(
//     filmSelector,
//     state => state.page);
    
//  const selectSizeSelector = createSelector(
//     filmSelector,
//     state => state.size);
    
// const selectTotalSizeSelector = createSelector(
//     filmSelector,
//     state => state.totalSize);

// const selectSelectedRowsSelector = createSelector(
//     filmSelector,
//     state => state.selectedRows);
/** function */
export const selectFilms = (state) => {
    return selectFilmSelector(state);
}
// export const selectPage = (state) => {
//     return selectPageSelector(state);
// }

// export const selectSize = (state) => {
//     return selectSizeSelector(state);
// }

// export const selectTotalSize = (state) => {
//     return selectTotalSizeSelector(state);
// }

// export const selectSelectedRows = (state) => {
//     return selectSelectedRowsSelector(state);
// }