import { DATA_POST_PERIZIA, DATA_ERROR } from "./action-types";

export const postPeriziaItem = (document) => async (dispatch) => {
  const idToken = loadIdToken();

  const headers = {
    Authorization: `Bearer ${idToken}`,
  };

  let arrSearch = document.location.pathname.split("/");

  if (arrSearch.length >= 5) {
    const body = {
      stato: arrSearch[1],
      anno: arrSearch[2],
      valore: arrSearch[3],
      uuid: arrSearch[4],
    };

    try {
      const response = await axios({
        baseURL: "http://localhost:3000",
        url: "/perizia",
        method: "post",
        headers,
        data: body,
      });
      let data = response.data;

      console.log(data);

      dispatch({
        type: DATA_POST_PERIZIA,
        data,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: DATA_ERROR,
        error,
      });
    }
  } else {
    
    //formato path non valido
    dispatch({
      type: DATA_POST_PERIZIA,
      data: {},
    });
  }
};
