import React from 'react'

import classes from './Order.module.css'

const Order = (props) => (
  <div className={classes.Order}>
    <span>Ingredients: </span>
    {Object.entries(props.ingredients).map(entry => {
      return (
        <span
          key={entry[0]}
          style={{
            textTransform: 'capitalize',
            margin: '0 8px',
            padding: '5px',
            border: '1px solid #ccc'
          }}>
          {entry[0]} ({entry[1]})
        </span>
      )
    })}
    <p>Price: <strong>${props.price}</strong></p>
  </div>
)

export default Order