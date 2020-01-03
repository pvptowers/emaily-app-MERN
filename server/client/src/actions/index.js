import axios from "axios";
import { FETCH_USER } from "./types";

//Define action creator
//fetchUser to see if they are logged in

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

//For sending Stripe API token
export const handleToken = token => async dispatch => {
  //post request to the backend server
  const res = await axios.post("/api/stripe", token);
  //response back from server. what are we going to dispatch? the user, so we can get their number of credits
  dispatch({ type: FETCH_USER, payload: res.data });
};
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values);

  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};
