import React from "react";
import { Route, Switch } from "react-router";
import SignInPage from "./components/Firebase/SignIn";
import SignUpPage from "./components/Firebase/SignUp";
import WeeksPlan from "./routes/WeeksPlan";
import WeekDetail from "./routes/WeekDetail";
import ScrollToTop from "./components/ScrollToTop";
import styled from "styled-components";
import Stats from "./routes/Stats";
import Weeks from "./routes/Weeks";
import PasswordForgetPage from "./components/Firebase/PasswordForget";
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 400px;
  padding: 20px;
  margin-bottom: 36px;
`;

function Routes() {
  return (
    <ScrollToTop>
      <Wrapper>
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/weeks" exact component={() => <Weeks />} />
          <Route path="/sign-in" exact component={() => <SignInPage />} />
          <Route path="/sign-up" exact component={() => <SignUpPage />} />
          <Route
            path="/password-forget"
            exact
            component={() => <PasswordForgetPage />}
          />
          <Route path="/weeks-plan" exact component={() => <WeeksPlan />} />
          <Route path="/week/:id" exact component={() => <WeekDetail />} />
          <Route path="/stats" exact component={() => <Stats />} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Wrapper>
    </ScrollToTop>
  );
}

export default Routes;
