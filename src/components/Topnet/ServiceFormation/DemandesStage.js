import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from "../Coordinateur/MaterialTableIcons";
import Loading from '../../../layouts/Topnet/Loading';

export default function DemandesStage() {

    const [loading, setLoading] = useState(true);

    const [demandesStage, setDemandeStage] = useState([]);

    useEffect(() => {

        axios.get('/api/demandesdestage').then(res => {
            if (res.data.status === 200) {

                setDemandeStage(res.data.demandesStage);
                console.log(res.data.demandesStage[0].ficherep);
                setLoading(false);
            }

        });
    }, []);

    const VoirImageFiche = (e, ficherep) => {
        e.preventDefault();
        window.open(`http://127.0.0.1:8000/${ficherep}`)


    }
    const VoirImageCV = (e, cv) => {
        e.preventDefault();
        window.open(`http://127.0.0.1:8000/${cv}`)

    }


    {/* Valider demande de stage */ }

    const validerDemande = (e, oid) => {
        e.preventDefault();

        axios.put(`/api/valider-demande/${oid}`).then(res => {

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
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Domaine et type de stage</h1>
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
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Fiche de réponse</h1>, render: demandesStage => {
                                    return (
                                        <span className="text-secondary text-xs font-weight-bold"> <Link to='#' onClick={(e) => VoirImageFiche(e, demandesStage.ficherep)}>Voir fiche de réponse</Link></span>

                                    )
                                }



                            },

                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4 ">Cv</h1>
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

                                            {demandesStage.etatdemande === 'Nouvellement créé' ? <Link to='#' onClick={(e) => validerDemande(e, demandesStage._id)}>
                                                <button className="btn btn-primary" >Nouvellement créé</button>
                                            </Link> : demandesStage.etatdemande === 'En cours de traitement' ? <Link to='#' onClick={(e) => validerDemande(e, demandesStage._id)}>
                                                <button className="btn btn-info" >En cours de traitement</button>
                                            </Link> : <Link to='#' onClick={(e) => validerDemande(e, demandesStage._id)}>
                                                <button className="btn btn-success" >Traitée</button>
                                            </Link>}

                                        </div>
                                    );
                                }
                            },


                        ]

                        }
                        data={demandesStage}
                        title={<h6>Demandes de stage</h6>}
                        icons={tableIcons}

                    />
                </div>
            </div >
        )
    }
}
