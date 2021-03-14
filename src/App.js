import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Redirect, Route, Switch } from 'react-router';
import Orders from './containers/Orders/orders';
import Auth from "./containers/Auth/Auth";
import Logout from './containers/Auth/Logout/Logout';
import * as actions from "./Store/actions/index";
import { connect } from 'react-redux';


class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render(){

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"></Redirect>
      </Switch>
    ); 

    if (this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"></Redirect>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
         {routes}
        </Layout>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup : () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
