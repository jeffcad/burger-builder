import React, { Component } from 'react'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  componentDidMount = () => {
    axios.get('/orders.json')
      .then(response => {
        const fetchedOrders = []
        Object.keys(response.data).forEach(key =>
          fetchedOrders.push({
            ...response.data[key],
            id: key
          }))
        this.setState({ loading: false, orders: fetchedOrders })
      })
      .catch(error => {
        this.setState({ loading: false })
      })
  }

  render() {

    let orderList = <h2 style={{ textAlign: 'center' }}>Loading...</h2>
    if (!this.state.loading) {
      orderList = this.state.orders.map(order => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />)
      })
    }

    return (
      <div>
        {orderList}
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios)