import {
  FETCH_PACKAGES_REQUEST,
  FETCH_PACKAGES_SUCCESS,
  FETCH_PACKAGES_FAILURE,
} from './types';

const initialPackagesState = {
  allIds: [],
  byId: null,
  isLoading: false,
  errors: [],
};

const packagesReducer = (state = initialPackagesState, action) => {
  switch (action.type) {
    case FETCH_PACKAGES_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_PACKAGES_SUCCESS:
      return {
        ...state,
        allIds: action.payload.allIds,
        byId: action.payload.byId,
        isLoading: false,
      };
    case FETCH_PACKAGES_FAILURE:
      return {
        ...state,
        errors: state.errors.concat({
          message: `Packages Failure ${action.payload}`,
        }),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default packagesReducer;
