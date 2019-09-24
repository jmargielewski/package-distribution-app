import { FETCH_TEAMS_REQUEST, FETCH_TEAMS_SUCCESS, FETCH_TEAMS_FAILURE } from './types';

const initialTeamsState = {
  allIds: [],
  byId: null,
  isLoading: false,
  errors: [],
};

const teamsReducer = (state = initialTeamsState, action) => {
  switch (action.type) {
    case FETCH_TEAMS_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        allIds: action.payload.allIds,
        byId: action.payload.byId,
        isLoading: false,
      };
    case FETCH_TEAMS_FAILURE:
      return {
        ...state,
        errors: state.errors.concat({
          message: `Teams Failure ${action.payload}`,
        }),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default teamsReducer;
