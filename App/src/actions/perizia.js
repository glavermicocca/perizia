import axios from 'axios'

import { DATA_POST_PERIZIA, DATA_ERROR } from './action-types'

const baseURL = process.env.REACT_APP_BASE_PATH

export const postPeriziaItem = location => async dispatch => {
  let arrSearch = location.pathname.split('/')

  //console.log(arrSearch.length)

  if (arrSearch.length >= 5) {
    const body = {
      stato: arrSearch[1],
      anno: arrSearch[2],
      valore: arrSearch[3],
      uuid: arrSearch[4]
    }

    try {
      const response = await axios({
        baseURL,
        url: '/perizia',
        method: 'post',
        data: body
      })
      let data = response.data

      dispatch({
        type: DATA_POST_PERIZIA,
        data
      })
    } catch (error) {
      console.error(error)
      dispatch({
        type: DATA_ERROR,
        error
      })
    }
  } else {
    window.location.replace('/app')
  }
}
