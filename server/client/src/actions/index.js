import axios from "axios";
import { FETCH_USER } from "./types";

//Define action creator
//fetchUser to see if they are logged in

const fetchUser = () => {
  axios.get("/api/current_user");
};
