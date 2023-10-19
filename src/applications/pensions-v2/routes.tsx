import { RouteProps } from 'react-router-dom';
import formConfig from './config/form';
import App from './PensionsV2App';

// @ts-ignore
import { createRoutesWithSaveInProgress } from 'platform/forms/save-in-progress/helpers';

interface CustomRouteProps extends RouteProps {
  indexRoute?: IndexRouteProps;
  childRoutes?: RouteProps[];
}

interface IndexRouteProps extends RouteProps {
  onEnter?: (nextState: any, replace: any) => any; // Replace 'any' with the appropriate types
}

const onEnter = (nextState: any, replace: any) => replace('/introduction');

const route: CustomRouteProps = {
  path: '/',
  component: App,
  indexRoute: {
    onEnter,
  },
  childRoutes: createRoutesWithSaveInProgress(formConfig),
};

export default route;
