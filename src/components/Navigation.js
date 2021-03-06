import React, { useEffect, useState } from "react";
import { FlexRow } from "./defaults/Flex";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import withAuthUser from "./Firebase/Session/withAuthUser";

const NavWrapper = styled.div`
  background-color: #ffd873;
`;

const Wrapper = styled(FlexRow)`
  max-width: 400px;
  margin-top: -1px;
  margin-bottom: 8px;
  justify-content: space-around;
  margin: 0 auto;

  z-index: 15;
  position: sticky;
  top: ${({ sticky }) => (sticky ? 0 : "initial")};
  transition: top 2500s linear;
  top: 0;
  padding: 16px 0;
`;

const NavLink = styled(Link)`
  cursor: pointer;
  font-size: 20px;
  color: #444444;
  opacity: ${({ isactive }) => (isactive ? 1 : 0.5)};
  font-weight: ${({ isactive }) => (isactive ? 700 : 400)};
  display: flex;
  flex-flow: row;
  align-items: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

function Navigation({ location: { pathname }, authUser }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    window.onscroll = e => {
      if (window.scrollY > 100) {
        if (!isSticky) {
          setIsSticky(true);
        }
      } else {
        if (isSticky) {
          setIsSticky(false);
        }
      }
    };
  });

  return (
    <NavWrapper>
      {authUser && (
        <Wrapper sticky={isSticky}>
          <NavLink
            isactive={pathname === "/" || pathname.includes("week") ? 1 : 0}
            to="/weeks"
          >
            <Icon alt="calendar-icon" src="/icons/calendar.svg" />
            <span>Weeks</span>
          </NavLink>
          <NavLink isactive={pathname === "/stats" ? 1 : 0} to="/stats">
            <Icon alt="stats-icon" src="/icons/stats.svg" />
            <span>Stats</span>
          </NavLink>
        </Wrapper>
      )}
    </NavWrapper>
  );
}

export default withAuthUser(withRouter(Navigation));
