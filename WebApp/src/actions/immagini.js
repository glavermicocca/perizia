import {
    callApi,
    loadIdToken
} from "../utils/apiUtils";

export function dati(id) {
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
        "/endpoint/crud_immagini?id=" + id,
        config,
        datiRequest,
        datiSuccess,
        datiFailure
    );
}

// --------------------------------------------------------
// ------------------ GENERIC to ACTIONS ------------------
// --------------------------------------------------------

export const DATI_REQUEST = "DATI_IMMAGINI_REQUEST";
export const DATI_SUCCESS = "DATI_IMMAGINI_SUCCESS";
export const DATI_FAILURE = "DATI_IMMAGINI_FAILURE";

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

export function datiFailure(error) {
    console.log(error)
    return {
        type: DATI_FAILURE,
        error
    };
}