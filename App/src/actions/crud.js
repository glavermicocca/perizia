import { callApi, loadIdToken } from '../utils/apiUtils'

import { dati as datiImmagini } from './immagini'

export function postPerizia(body) {
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }

  return callApi(process.env.REACT_APP_BASE_PATH + '/perizia', config, datiRequest, datiSuccess, datiFailure)
}

export function postPeriziaItem(body) {
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }

  return callApi(process.env.REACT_APP_BASE_PATH + '/perizia', config, datiRequest, datiSuccessItem, datiFailure)
}

export function dati() {
  const idToken = loadIdToken()
  const config = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  }

  return callApi(process.env.REACT_APP_BASE_PATH + '/crud', config, datiRequest, datiSuccess, datiFailure)
}

// --------------------------------------------------------
// ------------------ GENERIC to ACTIONS ------------------
// --------------------------------------------------------

export const DATI_REQUEST = 'DATI_REQUEST'
export const DATI_SUCCESS = 'DATI_SUCCESS'
export const DATI_SUCCESS_ITEM = 'DATI_SUCCESS_ITEM'
export const DATI_FAILURE = 'DATI_FAILURE'

export function datiRequest() {
  return {
    type: DATI_REQUEST
  }
}

export function datiSuccess(items) {
  //console.log(items)
  return {
    type: DATI_SUCCESS,
    items
  }
}

export function datiSuccessItem(items, dispatch) {
  if (Array.isArray(items)) {
    dispatch(datiImmagini(items[0].id))
    return {
      type: DATI_SUCCESS_ITEM,
      item: items[0]
    }
  } else {
    return {
      type: DATI_SUCCESS_ITEM,
      item: null
    }
  }
}

export function datiFailure(error) {
  //console.log(error)
  return {
    type: DATI_FAILURE,
    error
  }
}
