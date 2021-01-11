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
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
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
        const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000))
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('userId', response.data.localId)
        localStorage.setItem('expirationDate', expirationDate)
        dispatch(authSuccess(response.data.idToken, response.data.localId))
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(error => dispatch(authFail(error.response.data.error)))
  }
}

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    if (!token || (expirationDate < new Date())) {
      dispatch(logout())
    } else {
      const userId = localStorage.getItem('userId')
      dispatch(authSuccess(token, userId))
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
    }
  }
}