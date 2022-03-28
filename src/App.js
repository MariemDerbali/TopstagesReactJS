import axios from 'axios';
import Auth from "./auth/AuthStagiaire/Auth";
import AuthTOPNET from "./auth/AuthTopnet/AuthTOPNET";
import Home from './layouts/Home/Home';
import Page403 from './errors/Page403';
import Page404 from './errors/Page404';
import Forgotpassword from "./auth/forgotpassword/stagiaire/Forgotpassword";
import TopnetForgotpassword from './auth/forgotpassword/topnet/TopnetForgotpassword';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import CoordinateurPrivateRoute from './routes/CoordinateurPrivateRoute';
import Resetforgottenpassword from "./auth/forgotpassword/stagiaire/Resetforgottenpassword";
import TopnetResetForgottenpassword from './auth/forgotpassword/topnet/TopnetResetforgottenpassword';
import Resetfirstloginpassword from "./auth/AuthTopnet/Resetfirstloginpassword";
import ServiceFormationPrivateRoute from './routes/ServiceFormationPrivateRoute';
import StagiairePrivateRoute from "./routes/StagiairePrivateRoute";
import EncadrantPrivateRoute from './routes/EncadrantPrivateRoute';
import ChefDepartementPrivateRoute from './routes/ChefDepartementPrivateRoute';

import Offresdestage from './layouts/Home/Offresdestage';

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
            <Route exact path='/offresdestage' component={Offresdestage} />



            {/*Auth Routes*/}
            <Route exact path="/resetfirstloginpassword/:user_id" component={Resetfirstloginpassword} />



            {/*Stagiaire*/}

            <Route path='/auth' >
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Auth />}
            </Route>

            <Route path='/forgotpassword'>
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Forgotpassword />}
            </Route>

            <Route path='/resetforgottenpassword/:id' >
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Resetforgottenpassword />}
            </Route>


            {/*TOPNET*/}

            <Route path='/auth-TOPNET' >
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <AuthTOPNET />}
            </Route>

            <Route path='/topnet-forgotpassword'>
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <TopnetForgotpassword />}
            </Route>


            <Route path='/topnet-resetforgottenpassword/:id' >
              {localStorage.getItem('auth_token') ? <Redirect to='/' /> : < TopnetResetForgottenpassword />}
            </Route>



            {/*Private Routes*/}
            <CoordinateurPrivateRoute path="/coordinateur" name="Coordinateur" />
            <ServiceFormationPrivateRoute path="/serviceformation" name="ServiceFormation" />
            <EncadrantPrivateRoute path="/encadrant" name="Encadrant" />
            <ChefDepartementPrivateRoute path="/chefdepartement" name="ChefDepartement" />
            <StagiairePrivateRoute path="/stagiaire" name="Stagiaire" />





          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
