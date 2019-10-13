import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../index";
import { AuthUserContext } from ".";

function withAuthorization(Component) {
  WithAuthorization.propTypes = {
    firebase: PropTypes.shape({
      auth: PropTypes.func.isRequired
    }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  };

  function WithAuthorization(props) {
    const { firebase, history } = props;

    useEffect(() => {
      const listener = firebase.auth.onAuthStateChanged(authUser => {
        if (!authUser) {
          history.push("/sign-in");
        }
      });

      return function cleanup() {
        listener();
      };
    });

    return (
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <Component {...props} /> : null)}
      </AuthUserContext.Consumer>
    );
  }

  return withFirebase(withRouter(WithAuthorization));
}

export default withAuthorization;
