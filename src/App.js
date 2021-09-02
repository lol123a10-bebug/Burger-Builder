import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

import Logout from "./containers/Auth/Logout/Logout";

import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import Scrollbar from "./components/UI/Scrollbar/Scrollbar";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

class App extends Component {
  componentDidMount() {
    this.props.onAuthCheckState();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
        <Route path="/:Not_Found" render={() => <h2>Not Found</h2>} />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
          <Route path="/:Not_Found" render={() => <h2>Not Found</h2>} />
        </Switch>
      );
    }
    return (
      <Scrollbar>
        <div>
          <Layout>{routes}</Layout>
        </div>
      </Scrollbar>
    );
  }
}

const asyncAuth = asyncComponent(() => {
    return import("./containers/Auth/Auth");
});

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
