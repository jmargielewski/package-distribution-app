import {
  FETCH_TEAM_PACKAGES_REQUEST,
  FETCH_TEAM_PACKAGES_SUCCESS,
  FETCH_TEAM_PACKAGES_FAILURE,
  ADD_PACKAGE_TO_TEAM,
  CANCEL_TEAM_PACKAGE,
} from './types';

const initialTeamPackagesState = {
  allIds: [],
  byId: null,
  isLoading: false,
  errors: [],
};

const teamPackagesReducer = (state = initialTeamPackagesState, action) => {
  switch (action.type) {
    case FETCH_TEAM_PACKAGES_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_TEAM_PACKAGES_SUCCESS:
      return {
        ...state,
        allIds: action.payload.allIds,
        byId: action.payload.byId,
        isLoading: false,
      };
    case FETCH_TEAM_PACKAGES_FAILURE:
      return {
        ...state,
        errors: state.errors.concat({
          message: `Team Packages Failure ${action.payload}`,
        }),
        isLoading: false,
      };
    case ADD_PACKAGE_TO_TEAM:
      return {
        ...state,
        allIds: state.allIds.concat(action.payload.teamPackageId),
        byId: { ...state.byId, [action.payload.teamPackageId]: action.payload },
      };
    case CANCEL_TEAM_PACKAGE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.teamPackageId]: {
            ...state.byId[action.payload.teamPackageId],
            endDate: action.payload.endDate,
          },
        },
      };
    default:
      return state;
  }
};

export default teamPackagesReducer;
