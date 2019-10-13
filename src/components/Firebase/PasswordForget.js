import React from "react";
import { withFirebase } from "../Firebase";
import Input from "../defaults/Input";
import { ErrorMessage, StyledPrimaryButton, Title } from "./SignUp";
import { useSubmitForm } from "../../hooks";
import { FlexColumn } from "../defaults/Flex";
import { Loader } from "../defaults/Loader";

function PasswordForgetForm({ firebase }) {
  const onSubmit = event => {
    firebase
      .doPasswordReset(inputs.email)
      .then(() => {
        resetInputs();
      })
      .catch(error => {
        setError(error);
      });
  };

  const {
    resetInputs,
    inputs,
    handleInputChange,
    handleSubmit,
    error,
    setError,
    isSubmitted
  } = useSubmitForm(onSubmit);

  const { email } = inputs;
  const isInvalid = !email || email === "";

  return (
    <FlexColumn>
      <Title>Reset your password</Title>

      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          value={inputs.email || ""}
          onChange={handleInputChange}
          type="email"
          label="Email"
          required={true}
        />
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        <StyledPrimaryButton disabled={isInvalid} type="submit">
          {isSubmitted ? <Loader /> : "Reset My Password"}
        </StyledPrimaryButton>
      </form>
    </FlexColumn>
  );
}

const PasswordForgetPage = withFirebase(PasswordForgetForm);

export default PasswordForgetPage;
