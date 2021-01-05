import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'

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
        <Input inputtype="input" type="text" name="street" placeholder="Street address" />
        <Input inputtype="input" type="text" name="city" placeholder="City / Town" />
        <Input inputtype="input" type="text" name="name" placeholder="Name" />
        <Input inputtype="input" type="text" name="state" placeholder="State / Province" />
        <Input inputtype="input" type="text" name="postal" placeholder="Postal Code / ZIP" />
        <Input inputtype="input" type="text" name="country" placeholder="Country" />
        <Input inputtype="input" type="email" name="email" placeholder="Email address" />
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