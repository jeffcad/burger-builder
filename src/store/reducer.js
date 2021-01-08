import * as actionTypes from './actions'

const BASE_PRICE = 4.00
const INGREDIENT_PRICES = {
  lettuce: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
}

const initialState = {
  ingredients: {
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: BASE_PRICE,
  purchasable: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        purchasable: true
      }
    case actionTypes.REMOVE_INGREDIENT:
      const updatedPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: updatedPrice,
        purchasable: updatedPrice.toFixed(2) !== BASE_PRICE.toFixed(2)
      }
    default:
      return state
  }
}

export default reducer