import React from 'react'
import classes from './Burger.module.css'
import Ingredient from './Ingredients/Ingredient'

const Burger = (props) => {
  // Instructor's solution, it's hard to understand so I made my own below it
  // const transformedIngredients = Object.keys(props.ingredients)
  //   .map(igKey => {
  //     return [...Array(props.ingredients[igKey])].map((_, i) => {
  //       return <Ingredient key={igKey + i} type={igKey} />
  //     })
  //   })

  let middleIngredients = []
  if (props.ingredients) {
    Object.entries(props.ingredients).forEach(entry => {
      const [ingredientName, ingredientCount] = entry
      for (let i = 1; i <= ingredientCount; i++) {
        middleIngredients.push(<Ingredient key={ingredientName + i} type={ingredientName} />)
      }
    })
  }

  if (middleIngredients.length === 0) {
    middleIngredients = <h4>Please add some ingredients!</h4>
  }

  return (
    <div className={classes.Burger}>
      <Ingredient type="bread-top" />
      {middleIngredients}
      <Ingredient type="bread-bottom" />
    </div>
  )
}

export default Burger