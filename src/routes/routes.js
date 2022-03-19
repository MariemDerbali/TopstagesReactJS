import Dashboard from '../components/coordinateur/Dashboard';
import Adduser from '../components/coordinateur/Adduser';
import Edituser from '../components/coordinateur/Edituser';
import Users from '../components/coordinateur/Users';

import Profil from '../components/Profil';


import DashboardServiceFormation from '../components/ServiceFormation/DashboardServiceFormation';
import Departments from '../components/ServiceFormation/Departments';
import Adddepartment from '../components/ServiceFormation/Adddeparment';
import Editdepartment from '../components/ServiceFormation/Editdepartment';
import Questions from '../components/ServiceFormation/Questions';
import Addquestion from '../components/ServiceFormation/Addquestion';
import Editquestion from '../components/ServiceFormation/Editquestion';


const routes = [

    /*Routes privés Pour le coordinateur*/

    { path: '/coordinateur', exact: true, name: 'Coordinateur' },
    //Route pour le tableau de bord
    { path: '/coordinateur/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    //Route pour le profil
    { path: '/coordinateur/profil', exact: true, name: 'Profil', component: Profil },
    //Route pour consulter la liste des utilisateurs
    { path: '/coordinateur/users', exact: true, name: 'Users', component: Users },
    //Route pour créer un untilisateur
    { path: '/coordinateur/Adduser', exact: true, name: 'Adduser', component: Adduser },
    //Route pour modifier un utlisateur
    { path: '/coordinateur/edit-user/:_id', exact: true, name: 'Edituser', component: Edituser },

    /*--------------------------------------------------------------------------------------------------------------------------------------*/

    /* Routes privés pour le service formation*/

    { path: '/serviceformation', exact: true, name: 'ServiceFormation' },
    //Route pour le tableau de bord
    { path: '/serviceformation/dashboard', exact: true, name: 'DashboardServiceFormation', component: DashboardServiceFormation },
    //Route pour le profil
    { path: '/serviceformation/profil', exact: true, name: 'Profil', component: Profil },
    //Route pour consulter la liste des départements
    { path: '/serviceformation/departments', exact: true, name: 'Departments', component: Departments },
    //Route pour créer un département
    { path: '/serviceformation/Adddepartment', exact: true, name: 'Adddepartment', component: Adddepartment },
    //Route pour modifier un département
    { path: '/serviceformation/edit-department/:_id', exact: true, name: 'Editdepartment', component: Editdepartment },
    //Route pour consulter la liste des questions
    { path: '/serviceformation/questions', exact: true, name: 'Questions', component: Questions },
    //Route pour créer une question et des réponses
    { path: '/serviceformation/Addquestion', exact: true, name: 'Addquestion', component: Addquestion },
    //Route pour modifier une question et des réponses
    { path: '/serviceformation/edit-question/:_id', exact: true, name: 'Editquestion', component: Editquestion },


]
    ;

export default routes;