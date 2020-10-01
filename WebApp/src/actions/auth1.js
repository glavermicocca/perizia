import {
  callApi,
  ID_TOKEN,
  loadIdToken,
  setIdToken,
  removeIdToken,
  decodeUserProfile,
} from "../utils/apiUtils";

import { baseURL, LOGIN_REQUEST } from "./action-types";

export const postPeriziaItem = (user, password) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
    data: {},
  });

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const body = {
    user,
    password,
  };

  try {
    const response = await axios({
      baseURL,
      url: "/api/login",
      method: "post",
      headers,
      data: body,
    });
    let data = response.data;

    console.log(data);

    const idToken = data.ID_TOKEN; //payload[ID_TOKEN];
    setIdToken(idToken);
    const profile = decodeUserProfile(idToken);
    return {
      type: LOGIN_SUCCESS,
      user: profile.user,
      role: profile.role,
    };
  } catch (error) {
    console.error(error);
    dispatch({
      type: DATA_ERROR,
      error,
    });
  }
};
