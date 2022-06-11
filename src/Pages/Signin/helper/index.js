import {
  signinUserSuccess,
  signinUserInProgress,
  signinUserError,
  logoutUserSuccess,
  logoutUserError,
} from '../../../redux/reducers/authReducer';
import axios from '../../../axiosConfig';

export const signinUser = async (user, dispatch) => {
  try {
    dispatch(signinUserInProgress());
    let response = await axios.post('/signin', user);
    if (response.data.success) {
      dispatch(signinUserSuccess(response.data.data));
    } else {
      dispatch(signinUserError(response.data.success));
    }
    return response.data;
  } catch (error) {
    await dispatch(signinUserError());
  }
};

export const logOutUser = async (dispatch) => {
  try {
    let response = await axios.get('/logout');
    if (response.data.success) {
      dispatch(logoutUserSuccess());
    } else {
      dispatch(logoutUserError());
    }
    return response.data;
  } catch (error) {
    await dispatch(logoutUserError());
  }
};
