//import { useState, useEffect } from "react"
import {
  //BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
  withRouter,
} from "react-router-dom";

// Custom Components
import Profile from "./Profile";
import PaginationUsers from "./PaginationUsers"
import AddUser from "./AddUser";
import Login from "./Login";
import NotFound from "./NotFound";

function App() {

  return (
    <BrowserRouter>
        <Switch>

          <Route exact path="/" render={props => <Login {...props} />} />
          <Route exact path="/profile/:id" component={Profile}/>
          <Route exact path="/PaginationUsers" component={PaginationUsers}/>
          <Route exact path="/AddUser" component={AddUser}/>
          <Route component={NotFound} />

        </Switch>
    </BrowserRouter>
  );
}

export default withRouter(App);