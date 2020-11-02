import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import MainNav from "./config/route";
import * as serviceWorker from "./serviceWorker";
import { useCookies } from "react-cookie";
import { setToken } from "./utils/api";

function App({ children }) {
  const [userCookies, setUserCookie] = useCookies(["user"]);
  if (userCookies?.user?.jwt) {
    setToken(userCookies.user.jwt);
  }
  return <div>{children}</div>;
}

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App>
        <MainNav />
      </App>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
