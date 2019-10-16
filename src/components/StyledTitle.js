import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FlexRow } from "./defaults/Flex";
import SignOutButton from "./Firebase/SignOutButton";
import withAuthUser from "./Firebase/Session/withAuthUser";

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-bottom: 16px;
`;

const TitleWrapper = styled.div`
  background-color: #ffd873;
  width: 100%;
`;

const TitleWithIcon = styled.div`
  max-width: 400px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  flex-flow: ${({ authUser }) => (authUser ? "row" : "column")};
  justify-content: space-around;
  padding-bottom: 8px;
  padding-top: ${({ authUser }) => (authUser ? "8px" : 0)};
`;

const TextWrapper = styled(FlexRow)`
  margin-top: ${({ authUser }) => (!authUser ? "8px" : 0)};
`;

const Title = styled.h1`
  font-size: 1.8em;
  text-align: center;
  color: #444444;
  margin: 0;
`;

const Icon = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 10px;
  margin-top: 8px;
`;

function StyledTitle({ authUser }) {
  return (
    <StyledLink to={authUser ? "/weeks" : "/"}>
      <TitleWrapper>
        <TitleWithIcon authUser={authUser}>
          <TextWrapper authUser={authUser}>
            <Icon src="/icons/fitness.svg" />
            <Title>gymmie</Title>
          </TextWrapper>
          {/* <TitleText>track your workouts with ease</TitleText> */}
          {authUser && <SignOutButton />}
        </TitleWithIcon>
      </TitleWrapper>
    </StyledLink>
  );
}

export default withAuthUser(StyledTitle);
