import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import MaterialTable from 'material-table';
import tableIcons from "../MaterialTableIcons";
import Loading from '../../../../layouts/Topnet/Loading';
import '../../ServiceFormation/myStyle.css';

//pour consulter la liste des utilisateurs
export default function Users() {


    //Variables d'état pour afficher le spinner qui indique le chargement de la page
    const [loading, setLoading] = useState(true);

    //Varibles d'état pour obtenir la liste des utilisateurs
    const [users, setUser] = useState([]);

    //On utilise ce Hook -> useEFect() pour indiquer à React que notre composant doit exécuter quelque chose après chaque affichage
    useEffect(() => {
        //l'API pour obtenir la liste des utilisateurs
        axios.get('/api/users').then(res => {
            if (res.data.status === 200) {//si nous avons obtenu la liste
                setUser(res.data.users);  //stockage des utilisateurs dans les variables détat
                setLoading(false);//arrêter le chargement de la page
            }

        });
    }, []);

    {/* Activer ou Désactiver utilisateur*/ }

    const desactiverUser = (e, oid) => {
        e.preventDefault();

        axios.put(`/api/desactiver-user/${oid}`).then(res => {

            if (res.data.status = 200) {
                swal("", res.data.message, "success");
                window.location.reload();
            } else if (res.data.status === 401) {
                swal("", res.data.message, "warning");

            }
        });

    }


    //si la page est en cours de chargement, donc afficher un spinner
    if (loading) {
        return <Loading />
    }

    else {
        return (
            <div className="row " >
                <div className="col-12 ">
                    <MaterialTable
                        columns={[
                            {
                                title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Utilisateur</h1>//Cellule d'en-tête <th>
                                , render: users => {
                                    return (
                                        //Cellule de données <td>
                                        <div className="d-flex px-2 py-1">
                                            <div>
                                                <img src={`http://127.0.0.1:8000/${users.image}`} className="avatar avatar-sm me-3" alt="user1" />
                                            </div>
                                            <div className="d-flex flex-column justify-content-center">
                                                <h6 className="mb-0 text-sm">{users.nom} {users.prenom}</h6>
                                                <p className="text-xs text-secondary mb-0">{users.email}</p>
                                            </div>
                                        </div>)
                                }
                                ,
                                //pour personnaliser le filtrage et la recherche
                                customFilterAndSearch: (term, users) => ((users.nom + ' ' + users.prenom).toLowerCase()).indexOf(term.toLowerCase()) != -1 //filtrer et rechercher par nom et prénom

                            },

                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Rôle</h1>//Cellule d'en-tête <th>
                                , render: (users) => {
                                    return (
                                        <p className="text-xs font-weight-bold mb-0">{users.role_id}</p>)//Cellule de données <td>
                                }
                                ,

                                //pour personnaliser le filtrage et la recherche
                                customFilterAndSearch: (term, users) => ((users.role_id).toLowerCase()).indexOf(term.toLowerCase()) != -1 //filtrer et rechercher par rôle


                            },
                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Département</h1>//Cellule d'en-tête <th>
                                , render: (users) => {
                                    return (
                                        <p className="text-xs font-weight-bold mb-0 ">{users.departement}</p>)//Cellule de données <td>
                                }
                                ,
                                //pour personnaliser le filtrage et la recherche
                                customFilterAndSearch: (term, users) => ((users.departement).toLowerCase()).indexOf(term.toLowerCase()) != -1 //filtrer et rechercher par département


                            },

                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Service</h1>//Cellule d'en-tête <th>
                                , render: (users) => {
                                    return (
                                        <p className="text-xs font-weight-bold mb-0 ">{users.service}</p>)//Cellule de données <td>
                                },
                                customFilterAndSearch: (term, users) => ((users.service).toLowerCase()).indexOf(term.toLowerCase()) != -1 //filtrer et rechercher par direction



                            },




                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Matricule</h1>//Cellule d'en-tête <th>
                                , render: users => {
                                    return (
                                        //Cellule de données <td>
                                        <span className="text-secondary text-xs font-weight-bold">{users.matricule}</span>

                                    )
                                },

                                //pour personnaliser le filtre et la recherche
                                customFilterAndSearch: (users) => (users.matricule)//filtrer et rechercher par matricule

                            },
                            {
                                title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" style={{ marginLeft: '30px' }}>Etat</h1>//Cellule d'en-tête <th>
                                , render: users => {
                                    return (
                                        //Cellule de données <td>
                                        <div className="align-middle text-center text-sm">

                                            <Link to='#' onClick={(e) => desactiverUser(e, users._id)}>
                                                {users.etat == 'inactive' ?
                                                    <button className="btn btn-danger">Désactivé</button> :
                                                    <button className="btn btn-success">Activé</button>}
                                            </Link>
                                        </div>
                                    );
                                }
                            },
                            {
                                title: <h1 className="text-secondary opacity-7"></h1>//Cellule d'en-tête <th>
                                , render: users => {
                                    return (
                                        //Cellule de données <td>
                                        //Afficher l'icône de modification qui s'agit d'un lien de modification de l'utilisateur
                                        <Link to={`edit-user/${users._id}`} >   <svg className="text-dark" width="16px" height="16px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <title>settings</title>
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <g transform="translate(-2020.000000, -442.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                    <g transform="translate(1716.000000, 291.000000)">
                                                        <g transform="translate(304.000000, 151.000000)">
                                                            <polygon className="color-background" opacity="0.596981957" points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667">
                                                            </polygon>
                                                            <path className="color-background" d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z" opacity="0.596981957"></path>
                                                            <path className="color-background" d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z">
                                                            </path>
                                                        </g>
                                                    </g>
                                                </g>

                                            </g>
                                        </svg></Link>)
                                },

                            },


                        ]

                        }
                        data={users}//la liste des utilisateurs
                        title={<h6>Liste utilisateurs</h6>}//titre de tableau
                        icons={tableIcons}//icônes de tableau

                    />
                </div>
            </div>
        )

    };

}
