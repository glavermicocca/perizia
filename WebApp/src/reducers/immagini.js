import {
  DATI_FAILURE,
  DATI_SUCCESS,
  DATI_REQUEST
} from "../actions/immagini";

const initialState = {
  items: [],
  hasError: false
};

export default function alerts(state = initialState, action = {}) {
  switch (action.type) {
    case DATI_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case DATI_SUCCESS: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          items: [...action.items]
        }
      )
    }
    case DATI_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: action.error
      });
    default:
      return state;
  }
}
