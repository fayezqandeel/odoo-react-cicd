import createBrowserHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';

const history = window.matchMedia('(display-mode: standalone)').matches
  ? createHashHistory()
  : createBrowserHistory();

export default history;
