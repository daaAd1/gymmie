import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AuthUserContext from "./context";
import { withFirebase } from "../index";

function withAuthentication(Component) {
  WithAuthentication.propTypes = {
    firebase: PropTypes.shape({
      auth: PropTypes.func.isRequired
    })
  };

  function WithAuthentication(props) {
    const { firebase } = props;
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
      const listener = firebase.auth.onAuthStateChanged(authUser => {
        authUser ? setAuthUser(authUser) : setAuthUser(null);
      });

      return function cleanup() {
        listener();
      };
    });

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  }

  return withFirebase(WithAuthentication);
}

export default withAuthentication;
