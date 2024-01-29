import * as types from "../constants";

export function logOut() {
  return {
    type: types.USER_LOGIN_INFO,
    payload: {
      "userName": '',
      "email": '',
      "firstName": '',
      "lastName": '',
      "role": '',
      "status": ''
    }
  };
}

export function removeTokenInfo() {
  return {
    type: types.TOKEN_INFO,
    payload: ''
  };
}