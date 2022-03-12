import Dashboard from '../components/coordinateur/Dashboard';
import Profil from '../components/coordinateur/Profil';
import Adduser from '../components/coordinateur/Adduser';
import Edituser from '../components/coordinateur/Edituser';
import Users from '../components/coordinateur/Users';


import DashboardServiceFormation from '../components/ServiceFormation/DashboardServiceFormation';
import ProfilServiceFormation from '../components/ServiceFormation/ProfilServiceFormation';
import Departments from '../components/ServiceFormation/Departments';
import Adddepartment from '../components/ServiceFormation/Adddeparment';
import Editdepartment from '../components/ServiceFormation/Editdepartment';
import Questions from '../components/ServiceFormation/Questions';
import Addquestion from '../components/ServiceFormation/Addquestion';


const routes = [

    /*Coordinateur Routes*/
    { path: '/coordinateur', exact: true, name: 'Coordinateur' },
    { path: '/coordinateur/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/coordinateur/users', exact: true, name: 'Users', component: Users },
    { path: '/coordinateur/Adduser', exact: true, name: 'Adduser', component: Adduser },
    { path: '/coordinateur/profil', exact: true, name: 'Profil', component: Profil },
    { path: '/coordinateur/edit-user/:_id', exact: true, name: 'Edituser', component: Edituser },

    /*ServiceFormation Routes*/
    { path: '/serviceformation', exact: true, name: 'ServiceFormation' },
    { path: '/serviceformation/dashboard', exact: true, name: 'DashboardServiceFormation', component: DashboardServiceFormation },
    { path: '/serviceformation/profil', exact: true, name: 'ProfilServiceFormation', component: ProfilServiceFormation },

    { path: '/serviceformation/departments', exact: true, name: 'Departments', component: Departments },
    { path: '/serviceformation/Adddepartment', exact: true, name: 'Adddepartment', component: Adddepartment },
    { path: '/serviceformation/edit-department/:_id', exact: true, name: 'Editdepartment', component: Editdepartment },

    { path: '/serviceformation/questions', exact: true, name: 'Questions', component: Questions },
    { path: '/serviceformation/Addquestion', exact: true, name: 'Addquestion', component: Addquestion },

]
    ;

export default routes;