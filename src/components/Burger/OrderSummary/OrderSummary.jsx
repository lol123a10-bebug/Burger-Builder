import React, { Fragment, Component } from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      (igKey, index) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Fragment>
        <h3>Your order</h3>
        <p>A delicious burger with following ingredients: </p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button left btnType="Danger" clicked={this.props.purchaseCancelled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          Continue
        </Button>
      </Fragment>
    );
  }

  // const ingredientsSummary = Object.keys(this.props.ingredients);
  // ingredientsSummary.map((igKey) => {
  //   return <li><span style = {{textTransform: "capitalize"}}>{igKey}</span> : {this.props.ingredients[igKey]}</li>
  // }) DOEST WORK, WHY???????!!!
}

export default OrderSummary;
