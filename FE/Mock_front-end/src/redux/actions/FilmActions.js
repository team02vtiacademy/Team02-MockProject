import * as types from "../constants";

export function getListFilmAction(films){
  return{
    type: types.GET_LIST_FILM,
    payload: {
      films,
      // page,
      // totalSize
    }
  };
} 
// export function updateSelectedRowsAction(selectedRows){
//   return{
//     type: types.GET_LIST_USER_SELECTED_ROWS,
//     payload:selectedRows
//   };
// } 