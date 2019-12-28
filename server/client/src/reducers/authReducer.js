import { FETCH_USER } from "../actions/types";

//authReducer records whether or not the user is logged in

//default state on whether user is logged in or not is set to null, which means we dont know if they are or not
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
