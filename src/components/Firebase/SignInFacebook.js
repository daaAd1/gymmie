import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { FlexColumn } from "../defaults/Flex";
import { withFirebase } from ".";
import { ErrorMessage } from "./SignUp";
import styled from "styled-components";
import { PrimaryButton } from "../defaults/Buttons";

const Wrapper = styled(FlexColumn)`
  margin-bottom: 16px;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  margin-top: 8px;
  padding: 0;
  background: #3b5998;
`;

const Image = styled.img`
  width: 150px;
`;

function SignInFacebookForm({ firebase, history }) {
  const [error, setError] = useState(null);

  const onClick = event => {
    firebase
      .doSignInWithFacebook()
      .then(() => {
        history.push("/weeks");
      })
      .catch(error => {
        setError(error);
      });
    event.preventDefault();
  };

  return (
    <Wrapper>
      {error && <ErrorMessage>Error: {error.message}</ErrorMessage>}
      <StyledPrimaryButton onClick={onClick} type="submit">
        <Image alt="facebook-icon" src="/icons/facebook.svg" />
      </StyledPrimaryButton>
    </Wrapper>
  );
}

const SignInFacebook = withFirebase(withRouter(SignInFacebookForm));

export default SignInFacebook;
