import React from "react";
import { useHistory } from "react-router-dom";
import auth from "./auth";

export default function AuthButton() {
  let history = useHistory();

  return auth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Log out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}
