import axios from 'axios'

import * as actionTypes from './actionTypes'
import { apiKey, signUpUrl, signInUrl } from '../../no-github'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}
export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  }
}
export const authFail = (error) => {
  let errorMessage = error.message
  if (error.message === 'EMAIL_EXISTS') {
    errorMessage = 'Can\'t sign up with these credentials.'
  } else if (error.message === 'EMAIL_NOT_FOUND' || error.message === 'INVALID_PASSWORD') {
    errorMessage = 'Can\'t sign in with these credentials.'
  }

  return {
    type: actionTypes.AUTH_FAIL,
    error: errorMessage
  }
}
export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}
export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart())

    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    const url = isSignUp ? signUpUrl + apiKey : signInUrl + apiKey
    axios.post(url, authData)
      .then(response => {
        dispatch(authSuccess(response.data.idToken, response.data.localId))
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(error => dispatch(authFail(error.response.data.error)))
  }
}