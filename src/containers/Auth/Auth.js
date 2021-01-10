import React, { Component } from 'react'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'

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
    formIsValid: false
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

  render() {

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.orderHandler}>
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
            SUBMIT
          </Button>
        </form>
      </div>
    )
  }
}

export default Auth