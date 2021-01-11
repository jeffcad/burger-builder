import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Lettuce', type: 'lettuce' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p><strong>Current Price: ${props.price.toFixed(2)}</strong></p>
    {controls.map(control =>
      <BuildControl
        key={control.label}
        label={control.label}
        disabled={props.disabled[control.type]}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
      />)}
    <button
      className={classes.OrderButton}
      disabled={!props.isAuth ? false : !props.purchasable}
      onClick={props.ordered}
    >
      {props.isAuth ? 'ORDER NOW!' : 'GO TO LOGIN'}
    </button>
  </div>
)

export default BuildControls