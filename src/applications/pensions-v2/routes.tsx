import React from 'react';
import { Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import formConfig from './config/form';
import App from './PensionsV2App';

// @ts-ignore
import { createRoutesWithSaveInProgress } from 'platform/forms/save-in-progress/helpers';

interface CustomRouteProps extends RouteProps {
  indexRoute?: RouteProps;
  childRoutes?: RouteProps[];
}

const route: CustomRouteProps = {
  path: '/',
  component: App,
  indexRoute: {
    component: () => <Redirect to="/introduction" />,
  },
  childRoutes: createRoutesWithSaveInProgress(formConfig),
};

export default route;
