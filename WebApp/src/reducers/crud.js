import {
  DATI_FAILURE,
  DATI_SUCCESS,
  DATI_REQUEST
} from "../actions/crud";

const initialState = {
  dati: [],
  hasError: false
};

export default function alerts(state = initialState, action = {}) {
  switch (action.type) {
    case DATI_SUCCESS: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          dati: [...action.dati]
        }
      );
    }
    default:
      return state;
  }
}
