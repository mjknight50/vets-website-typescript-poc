import TypescriptApp from './containers/TypescriptApp.tsx';
import WebComponents from './containers/WebComponentsPlayground.tsx';

const routes = [
  {
    path: '/playground',
    component: WebComponents,
  },
  {
    path: '/',
    component: TypescriptApp,
  },
];

export default routes;
