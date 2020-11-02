import { Button } from "@material-ui/core";
import React from "react";
import { useCookies } from "react-cookie";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const logout = () => {
    removeCookie("user");
  };
  return (
    <div>
      <Button onClick={logout}> logout</Button>
    </div>
  );
}
