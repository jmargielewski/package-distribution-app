import axios from 'axios';
import { FETCH_TEAMS_REQUEST, FETCH_TEAMS_SUCCESS, FETCH_TEAMS_FAILURE } from './types';

import { formateTeamsEntity } from '../../normalizr';

const fetchTeamsSuccess = (response) => ({
  type: FETCH_TEAMS_SUCCESS,
  payload: formateTeamsEntity(response),
});

const fetchTeamsFailure = (err) => ({
  type: FETCH_TEAMS_FAILURE,
  payload: err,
});

export const fetchTeams = () => async (dispatch) => {
  dispatch({ type: FETCH_TEAMS_REQUEST });
  try {
    const response = await axios.get('https://api.npoint.io/95ab3d0438d80733b06b/teams');
    if (response.status === 200) {
      dispatch(fetchTeamsSuccess(response.data));
    } else {
      // ignore for now
      console.error(`status: ${response.status}`);
    }
  } catch (err) {
    dispatch(fetchTeamsFailure(err));
  }
};
