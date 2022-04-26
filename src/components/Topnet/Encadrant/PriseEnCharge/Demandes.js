import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import MaterialTable from 'material-table';
import tableIcons from "../../Coordinateur/MaterialTableIcons";
import Loading from '../../../../layouts/Topnet/Loading';

export default function Demandes() {

    const [loading, setLoading] = useState(true);

    const [demandesStage, setDemandeStage] = useState([]);

    useEffect(() => {

        axios.get('/api/encadrant-demandes').then(res => {
            if (res.data.status === 200) {
                setDemandeStage(res.data.demandes);
                setLoading(false);
            }

        });
    }, []);

    const VoirImageCV = (e, cv) => {
        e.preventDefault();
        window.open(`http://127.0.0.1:8000/${cv}`)

    }


    const validerPrise = (e, oid) => {
        e.preventDefault();

        axios.put(`/api/prise-en-charge/${oid}`).then(res => {

            if (res.data.status = 200) {
                swal("", res.data.message, "success");
                window.location.reload();
            } else if (res.data.status === 401) {
                swal("", res.data.message, "warning");

            }
        });

    }

    if (loading) {
        return <Loading />
    }

    else {

        return (
            <div className="row">
                <div className="col-12">
                    <MaterialTable
                        columns={[


                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Stagiaire</h1>
                                , render: (demandesStage) => {
                                    return (
                                        <div className="d-flex px-2 py-1">

                                            <div className="d-flex flex-column justify-content-center">

                                                <h6 className="mb-0 text-sm">{demandesStage.stagiaire[0].nom} {demandesStage.stagiaire[0].prenom}</h6>
                                                <p className="text-xs text-secondary mb-0">{demandesStage.stagiaire[0].email}</p>

                                            </div>
                                        </div>)
                                }

                            },


                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Domaine et type de stage</h1>
                                , render: (demandesStage) => {
                                    return (
                                        <div className="d-flex px-2 py-1">

                                            <div className="d-flex flex-column justify-content-center">

                                                <h6 className="mb-0 text-sm">{demandesStage.domaine}</h6>
                                                <p className="text-xs text-secondary mb-0">{demandesStage.type}</p>

                                            </div>
                                        </div>)
                                },
                                customFilterAndSearch: (term, demandesStage) => ((demandesStage.domaine + ' ' + demandesStage.type).toLowerCase()).indexOf(term.toLowerCase()) != -1 //filtrer et rechercher par nom et prénom


                            },



                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 ">Cv</h1>
                                , render: (demandesStage) => {
                                    return (
                                        <span className="text-secondary text-xs font-weight-bold">
                                            <Link to='#' onClick={(e) => VoirImageCV(e, demandesStage.cv)}>Voir CV
                                            </Link></span>
                                    )
                                }
                            },




                            {
                                title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-7" >Etat</h1>
                                , render: demandesStage => {
                                    return (
                                        <div className="align-middle text-center text-sm">

                                            {demandesStage.etatprise !== 'vrai' ?
                                                <Link to='#' onClick={(e) => validerPrise(e, demandesStage._id)}>
                                                    <button className="btn btn-primary" >Prendre en charge</button>
                                                </Link> :
                                                <Link to='#' onClick={(e) => validerPrise(e, demandesStage._id)}>
                                                    <button className="btn btn-success" >Annuler la prise en charge</button>
                                                </Link>}

                                        </div>
                                    );
                                }
                            },

                        ]

                        }
                        data={demandesStage}
                        title={<h6>Prise en charge des stagiaires</h6>}
                        icons={tableIcons}

                    />
                </div>
            </div >
        )
    }
}

