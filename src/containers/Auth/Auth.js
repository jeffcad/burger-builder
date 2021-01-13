import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'

function Auth(props) {

  const [formIsValid, setFormIsValid] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)

  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  })

  const checkValidity = (value, rules) => {
    if (rules.required && value.trim() === '') {
      return false
    }
    if (rules.minLength && value.trim().length < rules.minLength) {
      return false
    }
    if (rules.maxLength && value.trim().length > rules.maxLength) {
      return false
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      return pattern.test(value)
    }

    return true
  }

  const inputChangedHandler = (event, inputId) => {
    const updatedAuthForm = {
      ...authForm,
      [inputId]: {
        ...authForm[inputId],
        value: event.target.value,
        valid: checkValidity(event.target.value, authForm[inputId].validation),
        touched: true
      }
    }

    let formIsValid = true
    Object.keys(updatedAuthForm).forEach(key => {
      if (!updatedAuthForm[key].valid) {
        formIsValid = false
        return
      }
    })

    setAuthForm(updatedAuthForm)
    setFormIsValid(formIsValid)
  }

  const submitHandler = (event) => {
    event.preventDefault()

    const { email, password } = authForm
    props.onAuth(email.value, password.value, isSignUp)
  }

  const switchAuthModeHandler = () => {
    setIsSignUp(prevState => !prevState)
  }

  let form = (
    <form onSubmit={submitHandler}>
      {Object.keys(authForm).map(key => {
        const element = authForm[key]
        return (
          <Input
            key={key}
            id={key}
            elementType={element.elementType}
            elementConfig={element.elementConfig}
            value={element.value}
            invalid={!element.valid}
            shouldValidate={element.validation}
            touched={element.touched}
            changed={(event) => inputChangedHandler(event, key)}
          />
        )
      })}
      <Button
        buttonType="Success"
        disabled={!formIsValid}
      >
        {isSignUp ? 'SIGN UP' : 'SIGN IN'}
      </Button>
    </form>
  )

  if (props.loading) {
    form = <Spinner />
  }

  let errorMessage = null
  if (props.error) {
    errorMessage = <p>{props.error}</p>
  }

  let authRedirect = null
  if (props.isAuthenticated) {
    authRedirect = <Redirect to="/" />
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      {form}
      <Button
        buttonType="Danger"
        clicked={switchAuthModeHandler}
      >
        SWITCH TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)