import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../../layouts/Topnet/Loading';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from "../../Topnet/Coordinateur/MaterialTableIcons";

export default function Dossier() {
    const [loading, setLoading] = useState(true);

    const [demandesStage, setDemandeStage] = useState([]);


    const VoirImageFiche = (e, ficherep) => {
        e.preventDefault();
        window.open(`http://127.0.0.1:8000/${ficherep}`)


    }
    const VoirImageCV = (e, cv) => {
        e.preventDefault();
        window.open(`http://127.0.0.1:8000/${cv}`)

    }



    useEffect(() => {

        axios.get('/api/mondossier').then(res => {
            if (res.data.status === 200) {

                setDemandeStage(res.data.dossier);
                setLoading(false);

            }

        });
    }, []);

    if (loading) {
        return <Loading />
    }

    else {

        return (
            <div>



                <div className="row">
                    <div className="col-12">
                        <MaterialTable
                            columns={[


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

                                                {demandesStage.etatdemande === 'Nouvellement créé' ?
                                                    <span className="badge rounded-pill bg-light text-dark">
                                                        Votre dossier vient d'être envoyé!
                                                    </span>
                                                    : demandesStage.etatdemande === 'En cours de traitement' ?
                                                        <span className="badge rounded-pill bg-info text-dark">
                                                            Votre dossier est en cours de traitement.</span>
                                                        :
                                                        <span className="badge rounded-pill bg-success">
                                                            Votre dossier est traité.
                                                        </span>


                                                }

                                            </div>
                                        );
                                    }
                                },
                                {
                                    title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-5" >Date</h1>
                                    , render: demandesStage => {
                                        return (
                                            <div className="align-middle text-center text-sm">
                                                <span className="text-secondary text-xs font-weight-bold"> {demandesStage.date}</span>



                                            </div>
                                        );
                                    }
                                },

                            ]

                            }
                            data={demandesStage}
                            title={<h6>Mes dossiers</h6>}
                            icons={tableIcons}

                        />
                    </div>
                </div >




            </div>
        )
    }
}
