import React from "react";
import { withFirebase } from ".";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  border: 0;
  background-color: #ffd873;
`;

const Icon = styled.img`
  width: 36px;
  height: 36px;
`;

function SignOutButton({ firebase }) {
  const signOut = async () => {
    await firebase.doSignOut();
    window.location.reload();
  };

  return (
    <ButtonWrapper type="button" onClick={signOut}>
      <Icon src="/icons/sign-out.svg" alt="sign-out" />
    </ButtonWrapper>
  );
}

export default withFirebase(SignOutButton);
