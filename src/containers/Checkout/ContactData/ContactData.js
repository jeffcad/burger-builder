import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street address'
        },
        value: ''
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'City / Town'
        },
        value: ''
      },
      state: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'State / Province'
        },
        value: ''
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code / Zip code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email address'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'take-out', displayValue: 'Take-out' },
            { value: 'eat-in', displayValue: 'Eat-in' }
          ]
        },
        value: ''
      }
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()

    this.setState({ loading: true })
    const formData = {}
    Object.keys(this.state.orderForm).forEach(key => {
      formData[key] = this.state.orderForm[key].value
    })

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice?.toFixed(2),
      orderData: formData
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false })
        this.props.history.push('/')
      })
      .catch(error => this.setState({ loading: false }))
  }

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = { ...this.state.orderForm }
    const updatedFormElement = { ...updatedOrderForm[inputId] }
    updatedFormElement.value = event.target.value
    updatedOrderForm[inputId] = updatedFormElement
    this.setState({ orderForm: updatedOrderForm })
  }

  render() {

    let form = (
      <form onSubmit={this.orderHandler}>
        {Object.keys(this.state.orderForm).map(key => {
          return (
            <Input
              key={key}
              elementType={this.state.orderForm[key].elementType}
              elementConfig={this.state.orderForm[key].elementConfig}
              value={this.state.orderForm[key].value}
              changed={(event) => this.inputChangedHandler(event, key)}
            />
          )
        })}
        <Button buttonType="Success">ORDER</Button>
      </form>
    )
    if (this.state.loading) {
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

export default ContactData