import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import Loading from './Loading';

//En-tête de page pour tous les utilisateurs
export default function Header() {

    // Le hook useHistory() renvoie une instance history , qui contient l'emplacement actuel (URL) du composant que nous pouvons utiliser pour naviguer entre les pages.
    const history = useHistory();

    //Le useState() est un Hook qui vous permet d'avoir des variables d'état dans les composants fonctionnels.
    // Le premier élément est l’état initial et le second est une fonction qui est utilisée pour mettre à jour l’état.
    //Variables d'état pour obtenir la liste des utilisateurs
    const [user, setUser] = useState([]);
    //Variables d'état pour afficher le spinner qui indique le chargement de la page
    const [loading, setLoading] = useState(true);


    //Fonction de déconnexion
    const logoutSubmit = (e) => {
        e.preventDefault(); //C'est une méthode présente dans l'interface événementielle. Cette méthode empêche le navigateur d'exécuter le comportement par défaut de l'élément sélectionné. Cette méthode ne peut annuler l'événement que si l'événement est annulable.

        //Axios est une bibliothèque qui sert à créer des requêtes HTTP présentes en externe.
        //l'API de déconnexion
        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {
                //suppression du jeton d'authentification et du nom d'utilisateur authentifié du stockage local
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                //redirection vers la page d'authentification aprés la déconnexion
                if (user.role_id == 'Stagiaire') {
                    history.push('/auth');
                }
                else {
                    history.push('/auth-topnet');
                }


            }

        });

    }


    //On utilise ce Hook -> useEFect() pour indiquer à React que notre composant doit exécuter quelque chose après chaque affichage
    useEffect(() => {
        //l'API de l'utilisateur authentifié actuel
        axios.get('/api/currentuser').then(res => {
            if (res.data.status === 200) { //si l'utilisateur est trouvé

                //stockage de l'utilisateur authentifié actuel dans les variables d'état
                setUser(res.data.currentuser);
                //arrêter le chargement de la page
                setLoading(false);

                //si l'utilisateur non trouvé
            } else if (res.data.status === 404) {
                //afficher un message d'erreur
                swal("", res.data.message, "error");
            }
        });
    }, []);



    return (
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
            <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                        <li className="breadcrumb-item text-sm"><Link className="opacity-5 text-dark" to="#">Pages</Link></li>
                        <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Tableau de bord</li>
                    </ol>
                    {/*afficher le rôle de l'utilisateur authentifié actuel */}
                    <h6 className="font-weight-bolder mb-0">{user.role_id}</h6>
                </nav>
                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">

                    </div>
                    <ul className="navbar-nav  justify-content-end">

                        <li className="nav-item dropdown pe-3">
                            {/*si la page est en cours de chargement, donc afficher un spinner*/}
                            {loading ? <Loading /> :
                                // sinon afficher l'image , le nom et prénom de l'utilisateur authentifié actuel
                                <Link className="nav-link nav-profile d-flex align-items-center pe-0" to="#" data-bs-toggle="dropdown">
                                    <img src={`http://127.0.0.1:8000/${user.image}`} alt="Profile" className="avatar avatar-sm " />
                                    <span className="d-none d-md-block dropdown-toggle ps-2">{`${user.nom} ${user.prenom}`}</span>
                                </Link>}

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                {/*si l'utilisateur authentifié actuel est un service formation , donc afficher l'option de chemin d'accès à son profil */}
                                {user.role_id == 'ServiceFormation' ? <li>
                                    <Link className="dropdown-item d-flex align-items-center" to="/serviceformation/profil">
                                        <i className="bi bi-person"></i>
                                        <span>Mon profil</span>
                                    </Link>
                                </li>
                                    /*si l'utilisateur authentifié actuel est un coordinateur , donc afficher l'option de chemin d'accès à son profil */
                                    : user.role_id == 'Coordinateur' ?
                                        <li>
                                            <Link className="dropdown-item d-flex align-items-center" to="/coordinateur/profil">
                                                <i className="bi bi-person"></i>
                                                <span>Mon profil</span>
                                            </Link>
                                        </li> :
                                        //Sinon afficher le spinner
                                        <Loading />
                                }


                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    {/*Option pour la déconnexion */}
                                    <Link className="dropdown-item d-flex align-items-center" to="/auth" onClick={logoutSubmit} >
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Se déconnecter</span>
                                    </Link>
                                </li>

                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}