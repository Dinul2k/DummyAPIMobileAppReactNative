// authActions.js
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';


// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Action creators
export const login = (username, password, navigation) => async (dispatch) => {
  try {
    const response = await axios.post('https://dummyjson.com/auth/login', {
      username,
      password,
    });

    // Assuming the response structure includes a "user" object
    const userData = response.data.data; // Extract user data from the "data" property

    console.log('Login Success. User Data:', userData);

    // Dispatch success action with user data
    dispatch({
      type: LOGIN_SUCCESS,
      payload: userData,
    });
     // Navigate to the Home screen after successful login
     navigation.dispatch(
      CommonActions.navigate({
        name: 'Home',
      })
    );
  } catch (error) {
    console.error('Login Error:', error);

    // Dispatch failure action with error message
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });
  }
};
 