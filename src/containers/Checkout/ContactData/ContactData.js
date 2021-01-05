import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'

class ContactData extends Component {

  state = {
    customer: {
      name: '',
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
      },
      email: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()

    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice?.toFixed(2),
      customer: {
        name: 'P. Sherman',
        address: {
          street: '42 Wallaby Way',
          postalCode: '2000',
          city: 'Sydney',
          state: 'NSW',
          country: 'Australia'
        },
        email: 'psherman@aquariumdentist.com'
      },
      deliveryMethod: 'take-out'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false })
        this.props.history.push('/')
      })
      .catch(error => this.setState({ loading: false }))
  }

  render() {

    let form = (
      <form>
        <input className={classes.Input} type="text" name="street" placeholder="Street address" />
        <input className={classes.Input} type="text" name="city" placeholder="City / Town" />
        <input className={classes.Input} type="text" name="name" placeholder="Name" />
        <input className={classes.Input} type="text" name="state" placeholder="State / Province" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code / ZIP" />
        <input className={classes.Input} type="text" name="country" placeholder="Country" />
        <input className={classes.Input} type="email" name="email" placeholder="Email address" />
        <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
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