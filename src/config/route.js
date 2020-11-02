import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import LoginPage from "../containers/Login";
import SignUp from "../containers/SignUp";
import Home from "../containers/Home";
import ManageLabourer from "../containers/ManageLaborer";
import Wrapper from "../containers/Wrapper";
import AuthenticateHandle from "../containers/AuthenticateHandle";
import LaborerInfo from "../containers/LaborerInfo";
import LaborerDetailed from "../containers/LaborerDetailed";

export default function AuthExample() {
  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <PrivateRoute path="/authenticate_device">
          <AuthenticateHandle />
        </PrivateRoute>
        <PrivateRoute path="/dashboard">
          <LaborerInfo />
        </PrivateRoute>
        <PrivateRoute path="/detail_view">
          <LaborerDetailed />
        </PrivateRoute>
        <PrivateRoute path="/manage_laborers">
          <ManageLabourer />
        </PrivateRoute>
        <PrivateRoute path="/">
          <LaborerInfo />
        </PrivateRoute>
        <PrivateRoute path="/protected">
          <ProtectedPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const [userCookies, setUserCookie] = useCookies(["user"]);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return userCookies?.user?.jwt ? (
          <Wrapper>{children}</Wrapper>
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}
