import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

const BASE_PRICE = 4.00
const INGREDIENT_PRICES = {
  lettuce: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: BASE_PRICE,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  checkPurchasable(price) {
    return price.toFixed(2) === BASE_PRICE.toFixed(2) ? false : true
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const updatedPrice = oldPrice + priceAddition
    const updatedPurchasable = this.checkPurchasable(updatedPrice)
    this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice, purchasable: updatedPurchasable })
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0) return
    const updatedCount = oldCount - 1
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = updatedCount
    const priceSubtraction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const updatedPrice = oldPrice - priceSubtraction
    const updatedPurchasable = this.checkPurchasable(updatedPrice)
    this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice, purchasable: updatedPurchasable })
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      customer: {
        name: 'P. Sherman',
        address: {
          street: '42 Wallaby Way',
          postalCode: '2000',
          city: 'Sydney',
          state: 'NSW',
          country: 'Australia'
        },
        email: 'psherman@aquariumdentist.com'
      },
      deliveryMethod: 'take-out'
    }
    axios.post('/orders.json', order)
      .then(response => this.setState({ loading: false, purchasing: false }))
      .catch(error => this.setState({ loading: false, purchasing: false }))
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = (disabledInfo[key] <= 0)
    }

    let orderSummary = <OrderSummary
      ingredients={this.state.ingredients}
      price={this.state.totalPrice}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
    />
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          ordered={this.purchaseHandler}
        />
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)