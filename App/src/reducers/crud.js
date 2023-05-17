import {
  DATI_FAILURE,
  DATI_SUCCESS,
  DATI_SUCCESS_ITEM,
  DATI_REQUEST
} from "../actions/crud";

const initialState = {
  items: [],
  item: null,
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
    case DATI_SUCCESS_ITEM: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          item: action.item
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
