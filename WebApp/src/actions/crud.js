import {
    callApi,
    loadIdToken
} from "../utils/apiUtils";

export function postPerizia(body) {
    const config = {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    };

    return callApi(
        "/perizia",
        config,
        datiRequest,
        datiSuccess,
        datiFailure
    );
}

export function postPeriziaItem(body) {
    const config = {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    };

    return callApi(
        "/perizia",
        config,
        datiRequest,
        datiSuccessItem,
        datiFailure
    );
}

export function dati() {
    const idToken = loadIdToken();
    const config = {
        method: "get",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
        }
    };

    return callApi(
        "/crud",
        config,
        datiRequest,
        datiSuccess,
        datiFailure
    );
}

// --------------------------------------------------------
// ------------------ GENERIC to ACTIONS ------------------
// --------------------------------------------------------

export const DATI_REQUEST = "DATI_REQUEST";
export const DATI_SUCCESS = "DATI_SUCCESS";
export const DATI_SUCCESS_ITEM = "DATI_SUCCESS_ITEM";
export const DATI_FAILURE = "DATI_FAILURE";

export function datiRequest() {
    return {
        type: DATI_REQUEST
    };
}

export function datiSuccess(items) {
    console.log(items)
    return {
        type: DATI_SUCCESS,
        items
    };
}

export function datiSuccessItem(items) {
    if (Array.isArray(items)) {
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
    console.log(error)
    return {
        type: DATI_FAILURE,
        error
    };
}