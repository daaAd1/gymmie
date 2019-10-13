import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BackHomeLink = styled(Link)`
  text-decoration: underline;
`;

function NotFound() {
  return (
    <div>
      Page not found. <br />{" "}
      <BackHomeLink to="/">Go back to homepage</BackHomeLink>
    </div>
  );
}

export default NotFound;
