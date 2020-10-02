import React from 'react';
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivetdRoute = (children, ...rest) => {
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <Route
      {...rest}
      render={({ location }) =>
        LoggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivetdRoute;