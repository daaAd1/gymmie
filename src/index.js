import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import StyledTitle from "./components/StyledTitle";
import GlobalStyles from "./globalStyles";
import Navigation from "./components/Navigation";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./components/Firebase";
import Routes from "./router";
import { withAuthentication } from "./components/Firebase/Session";

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledTitle />
      <Navigation />
      <Routes />
    </>
  );
}

const WithAuthApp = withAuthentication(App);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <WithAuthApp />
    </Router>
  </FirebaseContext.Provider>,
  rootElement
);

serviceWorker.register();
