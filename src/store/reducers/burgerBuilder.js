import * as actionTypes from '../actions/actionTypes'

const BASE_PRICE = 4.00
const INGREDIENT_PRICES = {
  lettuce: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
}

const initialState = {
  ingredients: null,
  totalPrice: BASE_PRICE,
  purchasable: false,
  error: false,
  building: false
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
        purchasable: true,
        building: true
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
        purchasable: updatedPrice.toFixed(2) !== BASE_PRICE.toFixed(2),
        building: true
      }
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        // Setting like this to change the order of ingredients from
        // alphabetical, which is how Firebase returns them
        // otherwise could just use the line below
        // ingredients: action.ingredients,
        ingredients: {
          lettuce: action.ingredients.lettuce,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: BASE_PRICE,
        purchasable: false,
        error: false,
        building: false
      }
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}

export default reducer