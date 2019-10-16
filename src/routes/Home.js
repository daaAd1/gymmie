import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { FlexColumn } from "../components/defaults/Flex";
import { PrimaryLink } from "../components/defaults/Buttons";
import withAuthUser from "../components/Firebase/Session/withAuthUser";

const Wrapper = styled(FlexColumn)``;

const BackHomeLink = styled(PrimaryLink)`
  margin-top: 24px;
  font-size: 22px;
`;

const Features = styled.ol`
  padding-left: 0;
  list-style: none;
  counter-reset: my-awesome-counter;

  & li {
    counter-increment: my-awesome-counter;
    margin: 0;
    margin-bottom: 16px;
  }

  & li::before {
    content: counter(my-awesome-counter);
    background: #ffd873;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: inline-block;
    line-height: 2.5rem;
    color: #444444;
    font-weight: 700;
    text-align: center;
    margin-right: 0.5rem;
  }

  & li > p {
    margin: 0;
    margin-left: 22px;
    padding: 16px 16px 14px 16px;
    margin-top: -16px;
    border: 1px solid #ffd873;
    border-radius: 16px;
    font-size: 18px;
  }
`;

const MainText = styled.p`
  margin: 16px 0;
  font-size: 20px;
  padding: 0 8px;
`;

const FeaturesTitle = styled.h2`
  text-align: center;
  margin-bottom: 8px;
  font-size: 28px;
`;

function Home({ authUser }) {
  if (authUser) {
    return <Redirect to="/weeks" />;
  }

  return (
    <Wrapper>
      <MainText>
        Gymmie is an app for easily tracking your workouts and trainings.
      </MainText>
      <FeaturesTitle>Features</FeaturesTitle>
      <Features>
        <li>
          <p>{"Plan your next workouts"}</p>
        </li>
        <li>
          <p>Track your progress</p>
        </li>
        <li>
          <p>Get general stats from your workouts</p>
        </li>
      </Features>
      <BackHomeLink to="/sign-in">Sign in</BackHomeLink>
    </Wrapper>
  );
}

export default withAuthUser(Home);
