import axios from 'axios';
import Auth from "./auth/Auth";
import Home from './layouts/Home/Home';
import Page403 from './errors/Page403';
import Page404 from './errors/Page404';
import Forgotpassword from "./auth/Forgotpassword";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import CoordinateurPrivateRoute from './routes/CoordinateurPrivateRoute';
import Resetforgottenpassword from "./auth/Resetforgottenpassword";
import Resetfirstloginpassword from "./auth/Resetfirstloginpassword";
import ServiceFormationPrivateRoute from './routes/ServiceFormationPrivateRoute';



axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {

  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className="App">
      <div className="g-sidenav-show  bg-gray-100">
        <Router>
          <Switch>

            {/*All users Routes*/}
            <Route exact path="/403" component={Page403} />
            <Route exact path="/404" component={Page404} />
            <Route exact path="/" component={Home} />

            {/*Auth Routes*/}
            <Route exact path="/resetfirstloginpassword/:user_id" component={Resetfirstloginpassword} />
            <Route path='/resetforgottenpassword/:id' >
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Resetforgottenpassword />}
            </Route>
            <Route path='/forgotpassword'>
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Forgotpassword />}
            </Route>
            <Route path='/auth' >
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Auth />}
            </Route>

            {/*Private Routes*/}
            <CoordinateurPrivateRoute path="/coordinateur" name="Coordinateur" />
            <ServiceFormationPrivateRoute path="/serviceformation" name="ServiceFormation" />

          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
