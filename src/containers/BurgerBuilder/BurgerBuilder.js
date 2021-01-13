import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

export function BurgerBuilder(props) {

  const [purchasing, setPurchasing] = useState(false)

  useEffect(() => {
    if (!props.building) {
      props.onInitIngredients()
    }
  }, [])

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true)
    } else {
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    props.onInitPurchase()
    props.history.push('/checkout')
  }

  const disabledInfo = {
    ...props.ingredients
  }
  for (let key in disabledInfo) {
    disabledInfo[key] = (disabledInfo[key] <= 0)
  }

  let burger = props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />
  let orderSummary = null
  if (props.ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          price={props.totalPrice}
          disabled={disabledInfo}
          purchasable={props.purchasable}
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
        />
      </Aux>
    )
    orderSummary = <OrderSummary
      ingredients={props.ingredients}
      price={props.totalPrice}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
    />
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  )
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchasable: state.burgerBuilder.purchasable,
    error: state.burgerBuilder.error,
    building: state.burgerBuilder.building,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))