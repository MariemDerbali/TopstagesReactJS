import Dashboard from '../components/Topnet/Coordinateur/Dashboard';
import Adduser from '../components/Topnet/Coordinateur/Adduser';
import Edituser from '../components/Topnet/Coordinateur/Edituser';
import Users from '../components/Topnet/Coordinateur/Users';

import Profil from '../components/Topnet/Profil';

import DashboardServiceFormation from '../components/Topnet/ServiceFormation/DashboardServiceFormation';
import Departments from '../components/Topnet/ServiceFormation/Departments';
import Adddepartment from '../components/Topnet/ServiceFormation/Adddeparment';
import Editdepartment from '../components/Topnet/ServiceFormation/Editdepartment';
import Questions from '../components/Topnet/ServiceFormation/Questions';
import Addquestion from '../components/Topnet/ServiceFormation/Addquestion';
import Editquestion from '../components/Topnet/ServiceFormation/Editquestion';
import Addcritere from '../components/Topnet/ServiceFormation/Addcritere';
import Editcritere from '../components/Topnet/ServiceFormation/Editcritere';
import Criteres from '../components/Topnet/ServiceFormation/Criteres';
import DemandesStage from '../components/Topnet/ServiceFormation/DemandesStage';


import DashboardEncadrant from '../components/Topnet/Encadrant/DashboardEncadrant';
import Addoffre from '../components/Topnet/Encadrant/Addoffre';
import Offres from '../components/Topnet/Encadrant/Offres';
import Editoffre from '../components/Topnet/Encadrant/Editoffre';

import DashboardChefDepartement from '../components/Topnet/ChefDepartement/DashboardChefDepartement';
import Encadrants from '../components/Topnet/ChefDepartement/Encadrants';

import StagiaireProfil from '../components/Stagiaire/StagiaireProfil';
import Monespace from '../components/Stagiaire/Monespace';


const routes = [

    /*----------------------------------------Routes privés pour le coordinateur----------------------------------------------------------------------------------------------*/

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

    /*----------------------------------------Routes privés pour le service formation----------------------------------------------------------------------------------------------*/


    { path: '/serviceformation', exact: true, name: 'ServiceFormation' },
    //Route pour le tableau de bord
    { path: '/serviceformation/dashboard', exact: true, name: 'DashboardServiceFormation', component: DashboardServiceFormation },
    //Route pour le profil
    { path: '/serviceformation/profil', exact: true, name: 'Profil', component: Profil },

    /*----------DEPARTEMENT---------- */

    //Route pour consulter la liste des départements
    { path: '/serviceformation/departments', exact: true, name: 'Departments', component: Departments },
    //Route pour créer un département
    { path: '/serviceformation/Adddepartment', exact: true, name: 'Adddepartment', component: Adddepartment },
    //Route pour modifier un département
    { path: '/serviceformation/edit-department/:_id', exact: true, name: 'Editdepartment', component: Editdepartment },

    /*----------QUESTION ET REPONSES---------- */

    //Route pour consulter la liste des questions
    { path: '/serviceformation/questions', exact: true, name: 'Questions', component: Questions },
    //Route pour créer une question et des réponses
    { path: '/serviceformation/Addquestion', exact: true, name: 'Addquestion', component: Addquestion },
    //Route pour modifier une question et des réponses
    { path: '/serviceformation/edit-question/:_id', exact: true, name: 'Editquestion', component: Editquestion },

    /*----------CRITERES---------- */

    //Route pour créer un critère
    { path: '/serviceformation/Addcritere', exact: true, name: 'Addcritere', component: Addcritere },
    //Route pour modifier un critère
    { path: '/serviceformation/edit-critere/:_id', exact: true, name: 'Editcritere', component: Editcritere },
    //Route pour consulter la liste des critères
    { path: '/serviceformation/criteres', exact: true, name: 'Criteres', component: Criteres },

    /*----------Demandes de stage---------- */
    { path: '/serviceformation/demandesdestage', exact: true, name: 'DemandesStage', component: DemandesStage },


    /*----------------------------------------Routes privés pour l'encadrant----------------------------------------------------------------------------------------------*/

    { path: '/encadrant', exact: true, name: 'Encadrant' },
    { path: '/encadrant/profil', exact: true, name: 'Profil', component: Profil },
    { path: '/encadrant/dashboard', exact: true, name: 'DashboardEncadrant', component: DashboardEncadrant },
    { path: '/encadrant/Addoffre', exact: true, name: 'Addoffre', component: Addoffre },
    { path: '/encadrant/offres', exact: true, name: 'Offres', component: Offres },
    { path: '/encadrant/edit-offre/:_id', exact: true, name: 'Editoffre', component: Editoffre },


    /*----------------------------------------Routes privés pour le chéf département----------------------------------------------------------------------------------------------*/

    { path: '/chefdepartement', exact: true, name: 'ChefDepartement' },
    { path: '/chefdepartement/profil', exact: true, name: 'Profil', component: Profil },
    { path: '/chefdepartement/dashboard', exact: true, name: 'DashboardChefDepartement', component: DashboardChefDepartement },
    { path: '/chefdepartement/encadrants', exact: true, name: 'Encadrants', component: Encadrants },
    { path: '/chefdepartement/Addoffre', exact: true, name: 'Addoffre', component: Addoffre },
    { path: '/chefdepartement/offres', exact: true, name: 'Offres', component: Offres },
    { path: '/chefdepartement/edit-offre/:_id', exact: true, name: 'Editoffre', component: Editoffre },

    /*----------------------------------------Routes privés pour le stagiaire----------------------------------------------------------------------------------------------*/


    { path: '/stagiaire', exact: true, name: 'Stagiaire' },
    { path: '/stagiaire/profil', exact: true, name: 'MonProfil', component: StagiaireProfil },
    { path: '/stagiaire/monespace', exact: true, name: 'Monespace', component: Monespace },

]
    ;

export default routes;