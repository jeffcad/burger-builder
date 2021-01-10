import axios from 'axios'

import * as actionTypes from './actionTypes'
import { apiKey, signUpUrl, signInUrl } from '../../no-github'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}
export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  }
}
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
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
        console.log(response)
        dispatch(authSuccess(response.data))
      })
      .catch(error => {
        console.log(error)
        dispatch(authFail(error))
      })
  }
}