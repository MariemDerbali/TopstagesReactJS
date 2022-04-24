import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from "../../Coordinateur/MaterialTableIcons";
import Loading from '../../../../layouts/Topnet/Loading';

export default function Encadrants() {


    const [loading, setLoading] = useState(true);

    const [encadrants, setEncadrants] = useState([]);

    useEffect(() => {
        //l'API pour obtenir la liste les encadrants 
        axios.get('/api/encadrants').then(res => {
            if (res.data.status === 200) {
                setEncadrants(res.data.encadrants);
                setLoading(false);
            }

        });
    }, []);

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
                                title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Encadrants</h1>//Cellule d'en-tête <th>
                                , render: encadrants => {
                                    return (
                                        //Cellule de données <td>
                                        <div className="d-flex px-2 py-1">
                                            <div>
                                                <img src={`http://127.0.0.1:8000/${encadrants.image}`} className="avatar avatar-sm me-3" alt="user1" />
                                            </div>
                                            <div className="d-flex flex-column justify-content-center">
                                                <h6 className="mb-0 text-sm">{encadrants.nom} {encadrants.prenom}</h6>
                                                <p className="text-xs text-secondary mb-0">{encadrants.email}</p>
                                            </div>
                                        </div>)
                                }
                                ,
                                //pour personnaliser le filtrage et la recherche
                                customFilterAndSearch: (term, encadrants) => ((encadrants.nom + ' ' + encadrants.prenom).toLowerCase()).indexOf(term.toLowerCase()) != -1 //filtrer et rechercher par nom et prénom

                            },
                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Matricule</h1>//Cellule d'en-tête <th>
                                , render: encadrants => {
                                    return (
                                        //Cellule de données <td>
                                        <span className="text-secondary text-xs font-weight-bold">{encadrants.matricule}</span>

                                    )
                                }
                            },

                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Département</h1>//Cellule d'en-tête <th>
                                , render: (encadrants) => {
                                    return (
                                        <p className="text-xs font-weight-bold mb-0 ">{encadrants.departement}</p>)//Cellule de données <td>
                                }


                            },

                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Direction</h1>//Cellule d'en-tête <th>
                                , render: (encadrants) => {
                                    return (
                                        <p className="text-xs font-weight-bold mb-0">{encadrants.direction}</p>)//Cellule de données <td>
                                }
                                ,

                                //pour personnaliser le filtrage et la recherche
                                customFilterAndSearch: (term, encadrants) => ((encadrants.direction).toLowerCase()).indexOf(term.toLowerCase()) != -1 //filtrer et rechercher par rôle


                            },

                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Téléphone</h1>//Cellule d'en-tête <th>
                                ,
                                render: encadrants => {
                                    return (//Cellule de données <td>
                                        <span className="text-xs text-secondary mb-0">{encadrants.tel}</span>

                                    )
                                }

                            },

                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Adresse</h1>//Cellule d'en-tête <th>
                                , render: encadrants => {
                                    return (
                                        <span className="text-secondary text-xs font-weight-bold">{encadrants.adresse}</span>//Cellule de données <td>
                                    )
                                },

                            },





                        ]

                        }
                        data={encadrants}
                        title={<h6>Liste Encadrants</h6>}
                        icons={tableIcons}

                    />
                </div>
            </div>
        )

    };

}
