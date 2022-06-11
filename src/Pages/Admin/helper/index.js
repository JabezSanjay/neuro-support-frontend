import {
  createUserInProgress,
  createUserSuccess,
  createUserError,
  readUserInProgress,
  readUserSuccess,
  readUserError,
} from '../../../redux/reducers/adminUserReducer.js';
import axios from '../../../axiosConfig';

export const createUser = async (user, dispatch) => {
  try {
    dispatch(createUserInProgress());
    let response = await axios.post('/admin/create/user', user);
    if (response.data.success) {
      dispatch(createUserSuccess(response.data.data));
    } else {
      dispatch(createUserError(response.data.success));
    }
    return response.data;
  } catch (error) {
    await dispatch(createUserError());
  }
};

export const readUser = async (dispatch) => {
  try {
    dispatch(readUserInProgress());
    let response = await axios.get('/admin/read/users');
    if (response.data.success) {
      dispatch(readUserSuccess(response.data.data));
    } else {
      dispatch(readUserError(response.data.success));
    }
    return response.data;
  } catch (error) {
    await dispatch(readUserError());
  }
};
