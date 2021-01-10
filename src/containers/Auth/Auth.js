import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'

class Auth extends Component {

  state = {
    controls: {
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
    },
    formIsValid: false,
    isSignUp: true
  }

  checkValidity(value, rules) {
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

  inputChangedHandler = (event, inputId) => {
    const updatedControls = {
      ...this.state.controls,
      [inputId]: {
        ...this.state.controls[inputId],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[inputId].validation),
        touched: true
      }
    }

    let formIsValid = true
    Object.keys(updatedControls).forEach(key => {
      if (!updatedControls[key].valid) {
        formIsValid = false
        return
      }
    })

    this.setState({ controls: updatedControls, formIsValid })
  }

  submitHandler = (event) => {
    event.preventDefault()

    const { email, password } = this.state.controls
    this.props.onAuth(email.value, password.value, this.state.isSignUp)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp }
    })
  }

  render() {

    let form = (
      <form onSubmit={this.submitHandler}>
        {Object.keys(this.state.controls).map(key => {
          const element = this.state.controls[key]
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
              changed={(event) => this.inputChangedHandler(event, key)}
            />
          )
        })}
        <Button
          buttonType="Success"
          disabled={!this.state.formIsValid}
        >
          {this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}
        </Button>
      </form>
    )

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null
    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>
    }

    let authRedirect = null
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {form}
        <Button
          buttonType="Danger"
          clicked={this.switchAuthModeHandler}
        >
          SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    )
  }
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