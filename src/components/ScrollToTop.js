import { useEffect } from "react";
import { withRouter } from "react-router";

function ScrollToTop({
  children,
  location: { pathname },
  history: { action }
}) {
  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }, [pathname, action]);

  return children || null;
}

export default withRouter(ScrollToTop);
