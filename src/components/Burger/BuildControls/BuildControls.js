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
    <h2>Current Price: ${props.price.toFixed(2)}</h2>
    {controls.map(control =>
      <BuildControl
        key={control.label}
        label={control.label}
        disabled={props.disabled[control.type]}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
      />)}
  </div>
)

export default BuildControls