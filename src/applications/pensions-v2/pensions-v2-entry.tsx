import 'platform/polyfills';
import './sass/pensions-v2.scss';

// @ts-ignore
import startApp from 'platform/startup';

import routes from './routes';
import reducer from './reducers';
// @ts-ignore
import manifest from './manifest.json';

startApp({
  url: manifest.rootUrl,
  reducer,
  routes,
});
