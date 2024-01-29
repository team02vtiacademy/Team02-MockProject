import * as types from "../constants";

const initialState = {
  tickets: [],
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_TICKET:
      return {
        ...state,
        tickets: actions.payload
      };
    default:
      return state;
  }
}
