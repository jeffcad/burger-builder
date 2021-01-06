import React from 'react'

import classes from './Input.module.css'

const Input = (props) => {

  let inputElement = null
  const inputClasses = [classes.InputElement]

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
  }

  switch (props.elementType) {
    case 'input':
      inputElement = <input
        id={props.id}
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
      break
    case 'textarea':
      inputElement = <textarea
        id={props.id}
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
      break
    case 'select':
      inputElement = (
        <select
          id={props.id}
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      )
      break
    default:
      console.log('Unknown element')
  }

  return (
    <div className={classes.Input}>
      <label
        className={classes.Label}
        htmlFor={props.id}
        style={{ textTransform: 'capitalize' }}
      >{props.id.replace('_', ' ')}</label>
      {inputElement}
    </div>
  )
}

export default Input