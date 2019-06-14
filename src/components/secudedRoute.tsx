import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../helpers/auth";

type iProps = {
  component: any;
  path: string;
  exact: boolean;
};

const SecuredRoute = ({ component: Component, ...rest }: iProps) => {
  const [authorized, setAuthorized] = useState(false);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    setFetching(true);
    auth.isLoggedIn().then(res => {
      setAuthorized(res);
      setFetching(false);
    });
  }, []);

  return fetching ? null : (
    <Route
      {...rest}
      render={props => {
        if (authorized) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
export default SecuredRoute;
