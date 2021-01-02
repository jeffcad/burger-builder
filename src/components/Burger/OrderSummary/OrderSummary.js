import React from 'react'
import Aux from '../../../hoc/Auxiliary'

const OrderSummary = (props) => {
  let ingredientSummary = []
  Object.entries(props.ingredients).forEach(entry => {
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
      <p>Continue to Checkout?</p>
    </Aux>
  )
}

export default OrderSummary