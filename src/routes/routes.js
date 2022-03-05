import Dashboard from '../components/coordinateur/Dashboard';
import Profil from '../components/coordinateur/Profil';
import Adduser from '../components/coordinateur/Adduser';
import Edituser from '../components/coordinateur/Edituser';
import Users from '../components/coordinateur/Users';

const routes = [

    { path: '/coordinateur', exact: true, name: 'Coordinateur' },

    { path: '/coordinateur/dashboard', exact: true, name: 'Dashboard', component: Dashboard },


    { path: '/coordinateur/users', exact: true, name: 'Users', component: Users },
    { path: '/coordinateur/Adduser', exact: true, name: 'Adduser', component: Adduser },


    { path: '/coordinateur/profil', exact: true, name: 'Profil', component: Profil },
    { path: '/coordinateur/edit-user/:_id', exact: true, name: 'Edituser', component: Edituser }]
    ;

export default routes;