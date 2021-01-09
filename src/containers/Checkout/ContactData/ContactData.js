import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postal_code: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code / Zip code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      delivery: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'take-out', displayValue: 'Take-out' },
            { value: 'eat-in', displayValue: 'Eat-in' }
          ]
        },
        value: 'take-out',
        validation: {
          required: false
        },
        valid: true
      }
    },
    formIsValid: false,
  }

  orderHandler = (event) => {
    event.preventDefault()

    const formData = {}
    Object.keys(this.state.orderForm).forEach(key => {
      formData[key] = this.state.orderForm[key].value
    })

    const order = {
      ingredients: this.props.ings,
      price: this.props.price.toFixed(2),
      orderData: formData
    }

    this.props.onOrderBurger(order)
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

    return true
  }

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = { ...this.state.orderForm }
    const updatedFormElement = { ...updatedOrderForm[inputId] }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedOrderForm[inputId] = updatedFormElement

    let formIsValid = true
    Object.keys(updatedOrderForm).forEach(key => {
      if (!updatedOrderForm[key].valid) {
        formIsValid = false
        return
      }
    })

    this.setState({ orderForm: updatedOrderForm, formIsValid })
  }

  render() {

    let form = (
      <form onSubmit={this.orderHandler}>
        {Object.keys(this.state.orderForm).map(key => {
          const element = this.state.orderForm[key]
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
        <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    )
    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))