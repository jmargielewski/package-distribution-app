import axios from 'axios';
import moment from 'moment';
import shortid from 'shortid';
import {
  FETCH_TEAM_PACKAGES_REQUEST,
  FETCH_TEAM_PACKAGES_SUCCESS,
  FETCH_TEAM_PACKAGES_FAILURE,
  ADD_PACKAGE_TO_TEAM,
  CANCEL_TEAM_PACKAGE,
} from './types';

import { formateTeamPackagesEntity } from '../../normalizr';

const fetchTeamPackagesSuccess = (response) => ({
  type: FETCH_TEAM_PACKAGES_SUCCESS,
  payload: formateTeamPackagesEntity(response),
});

const fetchTeamPackagesFailure = (err) => ({
  type: FETCH_TEAM_PACKAGES_FAILURE,
  payload: err,
});

export const fetchTeamPackages = () => async (dispatch) => {
  dispatch({ type: FETCH_TEAM_PACKAGES_REQUEST });
  try {
    const response = await axios.get('/db/data.json');
    if (response.status === 200) {
      dispatch(fetchTeamPackagesSuccess(response.data.teamPackages));
    } else {
      // ignore for now
      console.error(`status: ${response.status}`);
    }
  } catch (err) {
    dispatch(fetchTeamPackagesFailure(err));
  }
};

export const addPackageToTeam = (_package, teamId) => ({
  type: ADD_PACKAGE_TO_TEAM,
  payload: {
    teamPackageId: shortid.generate(),
    packageId: _package.packageId,
    teamId,
    startDate: moment().format('YYYY-MM-DD'),
    endDate: null,
  },
});

export const cancelTeamPackage = (teamPackageId, endDate) => ({
  type: CANCEL_TEAM_PACKAGE,
  payload: {
    teamPackageId,
    endDate,
  },
});
