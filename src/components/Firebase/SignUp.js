import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { FlexColumn } from "../defaults/Flex";
import { withFirebase } from ".";
import Input from "../defaults/Input";
import { PrimaryButton } from "../defaults/Buttons";
import { useSubmitForm } from "../../hooks";
import { doSaveUser } from "../../firebase-db";
import { Loader } from "../defaults/Loader";

const SignUpWrapper = styled(FlexColumn)``;

export const Title = styled.h1`
  font-size: 26px;
  margin: 0;
  margin-bottom: 24px;
  text-align: center;
`;

const Form = styled.form``;

export const StyledPrimaryButton = styled(PrimaryButton)`
  margin-top: 24px;
`;

export const ErrorMessage = styled.p`
  margin: 24px 0 8px;
  color: #f78464;
`;

function SignUpForm({ firebase, history }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = () => {
    setIsSubmitted(true);

    const { name, email, password } = inputs;
    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        doSaveUser(firebase, authUser, { name, email });

        resetInputs();
        history.push("/weeks");
      })
      .catch(error => {
        setError(error.message);
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
    (!inputs.password ||
      inputs.password === "" ||
      !inputs.email ||
      inputs.email === "" ||
      !inputs.name ||
      inputs.name === "" ||
      !inputs.confirmPassword ||
      inputs.password !== inputs.confirmPassword);

  return (
    <SignUpWrapper>
      <Title>Sign up</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={inputs.name}
          onChange={handleInputChange}
          type="text"
          placeholder="John Smith"
          label="Full name"
        />
        <Input
          name="email"
          value={inputs.email}
          onChange={handleInputChange}
          type="email"
          placeholder="johnsmith@email.com"
          label="Email"
        />
        <Input
          name="password"
          value={inputs.password}
          onChange={handleInputChange}
          type="password"
          label="Password"
        />
        <Input
          name="confirmPassword"
          value={inputs.confirmPassword}
          onChange={handleInputChange}
          type="password"
          label="Confirm password"
        />
        {error && <ErrorMessage>Error: {error}</ErrorMessage>}
        <StyledPrimaryButton disabled={isInvalid} type="submit">
          {isSubmitted ? <Loader /> : "Sign Up"}
        </StyledPrimaryButton>
      </Form>
    </SignUpWrapper>
  );
}

const SignUpPage = withRouter(withFirebase(SignUpForm));

export default SignUpPage;
