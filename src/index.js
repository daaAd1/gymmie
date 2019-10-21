import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import StyledTitle from "./components/StyledTitle";
import GlobalStyles from "./globalStyles";
import Navigation from "./components/Navigation";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./components/Firebase";
import Routes from "./router";
import { withAuthentication } from "./components/Firebase/Session";

function App({ isUserLoaded }) {
  return (
    <>
      <GlobalStyles />
      <StyledTitle />
      <Navigation />
      <Routes isUserLoaded={isUserLoaded} />
    </>
  );
}

const WithAuthApp = withAuthentication(App);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <ToastProvider placement="bottom-center">
      <Router>
        <WithAuthApp />
      </Router>
    </ToastProvider>
  </FirebaseContext.Provider>,
  rootElement
);

serviceWorker.register();
