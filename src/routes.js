import App from './components/pages/App';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import List from './components/pages/List';
import File from './components/pages/File';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

export default function getRoutes(store) {
  return {
    component: App,
    childRoutes: [
      {
        path: '/',
        component: Home,
        onEnter: Home.onEnterReqAuth(store)
      },
      {
        path: '/logout',
        component: Home,
        onEnter: Home.onEnterLogout(store)
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/list',
        component: List,
        onEnter: List.onEnter(store)
      },
      {
        path: '/file/:id',
        name: 'dhd',
        component: File,
        onEnter: File.onEnter(store)
      },
      {
        path: '*',
        component: NotFound
      }
    ],
    onEnter: App.onEnter(store)
  };
}
