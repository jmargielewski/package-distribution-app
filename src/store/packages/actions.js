import axios from 'axios';
import {
  FETCH_PACKAGES_REQUEST,
  FETCH_PACKAGES_SUCCESS,
  FETCH_PACKAGES_FAILURE,
} from './types';

import { formatePackagesEntity } from '../../normalizr';

const fetchPackagesSuccess = (response) => ({
  type: FETCH_PACKAGES_SUCCESS,
  payload: formatePackagesEntity(response),
});

const fetchPackagesFailure = (err) => ({
  type: FETCH_PACKAGES_FAILURE,
  payload: err,
});

export const fetchPackages = () => async (dispatch) => {
  dispatch({ type: FETCH_PACKAGES_REQUEST });
  try {
    const response = await axios.get('https://api.myjson.com/bins/17bkkk');
    if (response.status === 200) {
      dispatch(fetchPackagesSuccess(response.data.packages));
    } else {
      // ignore for now
      console.error(`status: ${response.status}`);
    }
  } catch (err) {
    dispatch(fetchPackagesFailure(err));
  }
};
