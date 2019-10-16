import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { FlexColumn } from "../defaults/Flex";
import { ErrorMessage } from "./SignUp";
import styled from "styled-components";
import { PrimaryButton } from "../defaults/Buttons";
import { withFirebase } from ".";
import { doSaveUser } from "../../firebase-db";

const Wrapper = styled(FlexColumn)`
  margin-bottom: 16px;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  margin-top: 8px;
  padding: 0;
  background: white;
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #414141;
`;

const Image = styled.img`
  height: 30px;
  margin-right: 16px;
`;

const Text = styled.p`
  margin: 0;
  margin-top: 4px;
`;

function SignInGoogleForm({ firebase, history }) {
  const [error, setError] = useState(null);

  const onClick = event => {
    firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        doSaveUser(firebase, socialAuthUser, {
          name: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email
        });
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
        <Image alt="facebook-icon" src="/icons/google.svg" />
        <Text>Google</Text>
      </StyledPrimaryButton>
    </Wrapper>
  );
}

const SignInGoogle = withFirebase(withRouter(SignInGoogleForm));

export default SignInGoogle;
