import React, { Component } from 'react'
import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log('[OrderSummary] componentDidUpdate')
  }

  render() {

    let ingredientSummary = []
    Object.entries(this.props.ingredients).forEach(entry => {
      const [ingredientName, ingredientCount] = entry
      ingredientSummary.push(
        <li key={ingredientName}>
          <span style={{ textTransform: 'capitalize' }}>
            {ingredientName}
          </span>
        : {ingredientCount}
        </li>)
    })

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A tasty burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button
          buttonType="Danger"
          clicked={this.props.purchaseCancelled}
        >CANCEL
      </Button>
        <Button
          buttonType="Success"
          clicked={this.props.purchaseContinued}
        >CONTINUE
      </Button>
      </Aux>
    )
  }
}

export default OrderSummary