import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export interface IPrivateRouteProps extends RouteProps {
  redirectPath: string;
}

const GuardRoute: React.FC<IPrivateRouteProps> = (props) => {
  const accessToken = localStorage.getItem('accessToken');

  return accessToken ? (
    <Route {...props} component={props.component} />
  ) : (
    <Redirect to={{ pathname: props.redirectPath }} />
  );
};

export default GuardRoute;
