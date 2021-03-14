import { Component } from "react";
import React from "react";
import Burger from "../../components/Burger/Burger";
import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = (ingredients) => {
    let sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((total, el) => total + el, 0);

    return sum > 0 ;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated){
    this.setState({ purchasing: true });
    }else{
      this.props.onSetAuthRedirectPath("./checkout");
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinue = () => {
    this.props.onInitPurchase();
    this.props.history.push('./checkout');
  };

 

  render() {
    let disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    console.log(this.props.error); 
    let burger = this.props.error ? 
      <p>Ingredients can`t be loaded</p>
     : 
      <Spinner />
    ;

    if (this.props.ings) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            price={this.props.totalPrice}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            purchasable={this.updatePurchaseState(this.props.ings)}
            isAuth={this.props.isAuthenticated}
          ></BuildControls>
        </React.Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinue}
        />
      );
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients : () => dispatch(actions.initIngredients()),
    onInitPurchase : () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
