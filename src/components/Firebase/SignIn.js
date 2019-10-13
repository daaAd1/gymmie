import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { FlexColumn, FlexRow } from "../defaults/Flex";
import { Title, StyledPrimaryButton, ErrorMessage } from "./SignUp";
import Input from "../defaults/Input";
import { useSubmitForm } from "../../hooks";
import SignInGoogle from "./SignInGoogle";
import SignInFacebook from "./SignInFacebook";
import styled from "styled-components";
import { withFirebase } from ".";
import { Loader } from "../defaults/Loader";

SignInForm.propTypes = {
  firebase: PropTypes.shape({
    doSignInWithEmailAndPassword: PropTypes.func.isRequired
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const DelimeterWrapper = styled(FlexRow)`
  margin: 20px 0;
`;

const DelimeterText = styled.div`
  flex: 0.5 auto;
  color: gray;
  text-align: center;
`;

const DelimeterLine = styled.div`
  background-color: lightgray;
  height: 1px;
  flex: 1 auto;
`;

const RegisterLinkWrapper = styled.p`
  margin: 24px 0 16px;
`;

const StyledLink = styled(Link)`
  padding: 2px;
  border-bottom: 1px solid #ffd873;
`;

const ForgotPassword = styled(Link)`
  margin: 16px 0;
  padding: 2px;
  border-bottom: 1px solid #ffd873;
`;

function SignInForm({ firebase, history }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = () => {
    setIsSubmitted(true);

    const { email, password } = inputs;
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        resetInputs();
        history.push("/weeks");
      })
      .catch(error => {
        setError(error);
      });

    setIsSubmitted(false);
  };

  const {
    resetInputs,
    inputs,
    handleInputChange,
    handleSubmit,
    error,
    setError
  } = useSubmitForm(onSubmit);

  const isInvalid =
    !inputs ||
    !inputs.password ||
    inputs.password === "" ||
    !inputs.email ||
    inputs.email === "";

  return (
    <FlexColumn>
      <Title>Sign in to your account</Title>
      <SignInGoogle />
      <SignInFacebook />
      <DelimeterWrapper>
        <DelimeterLine />
        <DelimeterText>or</DelimeterText>
        <DelimeterLine />
      </DelimeterWrapper>

      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          value={inputs.email || ""}
          onChange={handleInputChange}
          type="email"
          label="Email"
          required={true}
        />
        <Input
          name="password"
          value={inputs.password || ""}
          onChange={handleInputChange}
          type="password"
          label="Password"
          required={true}
        />
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        <StyledPrimaryButton disabled={isInvalid} type="submit">
          {isSubmitted ? <Loader /> : "Sign In"}
        </StyledPrimaryButton>
        <RegisterLinkWrapper>
          {"Don't have an account? "}
          <StyledLink to={"/sign-up"}>Sign Up</StyledLink>
        </RegisterLinkWrapper>
        <ForgotPassword to={"/password-forget"}>
          Forgot your password?
        </ForgotPassword>
      </form>
    </FlexColumn>
  );
}

const SignInPage = withFirebase(withRouter(SignInForm));

export default SignInPage;
