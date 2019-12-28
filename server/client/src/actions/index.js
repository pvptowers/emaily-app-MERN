import axios from "axios";
import { FETCH_USER } from "./types";

//Define action creator
//fetchUser to see if they are logged in

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res });
};
