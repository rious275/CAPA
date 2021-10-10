import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Nav from "./component/Nav";
import Main from "./pages/Main";

const Routes = () => {
    return (
        <Router>
          <Nav />
          <Switch>
            <Redirect exact path="/" to="/main" />
            <Route exact path="/main" component={Main} />
          </Switch>
        </Router>
    )
}

export default Routes;