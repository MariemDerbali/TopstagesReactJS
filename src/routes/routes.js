import Dashboard from '../components/Topnet/Coordinateur/Dashboard/Dashboard';
import Adduser from '../components/Topnet/Coordinateur/Users/Adduser';
import Edituser from '../components/Topnet/Coordinateur/Users/Edituser';
import Users from '../components/Topnet/Coordinateur/Users/Users';

import Profil from '../components/Topnet/Profil';

import DashboardServiceFormation from '../components/Topnet/ServiceFormation/Dashboard/DashboardServiceFormation';

import Questions from '../components/Topnet/ServiceFormation/Questions/Questions';
import Addquestion from '../components/Topnet/ServiceFormation/Questions/Addquestion';
import Editquestion from '../components/Topnet/ServiceFormation/Questions/Editquestion';

import Adddirection from '../components/Topnet/ServiceFormation/Directions/Adddirection';
import Editdirection from '../components/Topnet/ServiceFormation/Directions/Editdirection';
import Directions from '../components/Topnet/ServiceFormation/Directions/Directions';

import Addcritere from '../components/Topnet/ServiceFormation/Criteres/Addcritere';
import Editcritere from '../components/Topnet/ServiceFormation/Criteres/Editcritere';
import Criteres from '../components/Topnet/ServiceFormation/Criteres/Criteres';
import DemandesStage from '../components/Topnet/ServiceFormation/DemandeStage/DemandesStage';


import DashboardEncadrant from '../components/Topnet/Encadrant/Dashboard/DashboardEncadrant';
import Addoffre from '../components/Topnet/Encadrant/Offres/Addoffre';
import Offres from '../components/Topnet/Encadrant/Offres/Offres';
import Editoffre from '../components/Topnet/Encadrant/Offres/Editoffre';
import Demandes from '../components/Topnet/Encadrant/PriseEnCharge/Demandes';
import Reunions from '../components/Topnet/Encadrant/Reunions/Reunions';


import DashboardChefDepartement from '../components/Topnet/ChefDepartement/Dashboard/DashboardChefDepartement';
import Encadrants from '../components/Topnet/ChefDepartement/ListEncadrants/Encadrants';

import StagiaireProfil from '../components/Stagiaire/MonProfil/StagiaireProfil';
import Dossier from '../components/Stagiaire/MonDossier/Dossier';
import Monespace from '../components/Stagiaire/MonEspace/Monespace';
import Calendar from '../components/Topnet/Encadrant/Reunions/Calendar';
import Editevent from '../components/Topnet/Encadrant/Reunions/Editevent';


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

    /*----------DIRECTION ET DEPARTEMENTS---------- */

    //Route pour consulter la liste des directions
    { path: '/serviceformation/directions', exact: true, name: 'Departments', component: Directions },
    //Route pour créer un direction
    { path: '/serviceformation/Adddirection', exact: true, name: 'Adddirection', component: Adddirection },
    //Route pour modifier un direction
    { path: '/serviceformation/edit-direction/:_id', exact: true, name: 'Editdirection', component: Editdirection },


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
    { path: '/encadrant/demandes', exact: true, name: 'Demandes', component: Demandes },
    { path: '/encadrant/reunions', exact: true, name: 'Reunions', component: Reunions },
    { path: '/encadrant/calendrier', exact: true, name: 'Calendrier', component: Calendar },
    { path: '/encadrant/edit-event/:_id', exact: true, name: 'Editevent', component: Editevent },




    /*----------------------------------------Routes privés pour le chéf département----------------------------------------------------------------------------------------------*/

    { path: '/chefdepartement', exact: true, name: 'ChefDepartement' },
    { path: '/chefdepartement/profil', exact: true, name: 'Profil', component: Profil },
    { path: '/chefdepartement/dashboard', exact: true, name: 'DashboardChefDepartement', component: DashboardChefDepartement },
    { path: '/chefdepartement/encadrants', exact: true, name: 'Encadrants', component: Encadrants },
    { path: '/chefdepartement/Addoffre', exact: true, name: 'Addoffre', component: Addoffre },
    { path: '/chefdepartement/offres', exact: true, name: 'Offres', component: Offres },
    { path: '/chefdepartement/edit-offre/:_id', exact: true, name: 'Editoffre', component: Editoffre },
    { path: '/chefdepartement/demandes', exact: true, name: 'Demandes', component: Demandes },
    { path: '/chefdepartement/reunions', exact: true, name: 'Reunions', component: Reunions },
    { path: '/chefdepartement/calendrier', exact: true, name: 'Calendrier', component: Calendar },
    { path: '/chefdepartement/edit-event/:_id', exact: true, name: 'Editevent', component: Editevent },




    /*----------------------------------------Routes privés pour le stagiaire----------------------------------------------------------------------------------------------*/


    { path: '/stagiaire', exact: true, name: 'Stagiaire' },
    { path: '/stagiaire/profil', exact: true, name: 'MonProfil', component: StagiaireProfil },
    { path: '/stagiaire/dossier', exact: true, name: 'MonDossier', component: Dossier },
    { path: '/stagiaire/monespace', exact: true, name: 'Monespace', component: Monespace },

]
    ;

export default routes;