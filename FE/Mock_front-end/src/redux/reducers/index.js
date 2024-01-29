import { combineReducers } from "redux";

import sidebar from "./sidebarReducers";
import layout from "./layoutReducer";
import theme from "./themeReducer";
import UserLoginInfo from "./UserLoginInfoReducers";
import Group from "./GroupReducers";
import Ticket from "./TicketReducers";
import User from "./UserReducer";
import Film from "./FilmReducer";
import Schedule from "./ScheduleReducer"
import { reducer as toastr } from "react-redux-toastr";

export default combineReducers({
  sidebar,
  layout,
  theme,
  toastr,
  UserLoginInfo,
  Group,
  User,
  Film,
  Schedule,
  Ticket
});
