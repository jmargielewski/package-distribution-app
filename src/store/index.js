import { combineReducers } from 'redux';
import teamsReducer from './teams/reducers';
import packagesReducer from './packages/reducers';
import teamPackagesReducer from './teamPackages/reducers';

const rootReducer = combineReducers({
  teams: teamsReducer,
  packages: packagesReducer,
  teamPackages: teamPackagesReducer,
});

export default rootReducer;
