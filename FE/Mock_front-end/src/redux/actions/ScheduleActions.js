import * as types from "../constants";

export function getListScheduleAction(schedules,page,totalSize){
  return{
    type: types.GET_LIST_SCHEDULE,
    payload: {
      schedules,
      page,
      totalSize
    }
  };
} 
export function updateSelectedRowsAction(selectedRows){
  return{
    type: types.GET_LIST_SCHEDULE_SELECTED_ROWS,
    payload:selectedRows
  };
} 