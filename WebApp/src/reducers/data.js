import {
  DATA_POST_PERIZIA,
  DATA_ERROR,
  DATA_FETCHING,
} from "../actions/action-types";

const initialState = {
  perizia: null,
  errori_di_coniazione: [],
  immagini: [],
  hasError: false,
};

export default function data(state = initialState, action = {}) {
  switch (action.type) {
    case DATA_FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case DATA_POST_PERIZIA: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          perizia: action.data.perizia,
          errori_di_coniazione: [...action.data.errori_di_coniazione],
          immagini: [...action.data.immagini],
        }
      );
    }
    case DATA_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: action.error,
      });
    default:
      return state;
  }
}
