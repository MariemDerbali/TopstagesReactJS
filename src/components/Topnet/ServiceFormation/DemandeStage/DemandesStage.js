import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from "../../Coordinateur/MaterialTableIcons";
import Loading from '../../../../layouts/Topnet/Loading';

export default function DemandesStage() {

    const [loading, setLoading] = useState(true);


    const [errorlist, setError] = useState([]);

    const [NotifInput, setNotif] = useState({
        message: '',

    });



    const handleNotifInput = (e) => {
        e.persist();
        setNotif({ ...NotifInput, [e.target.name]: e.target.value });
    }

    const [demandesStage, setDemandeStage] = useState([]);

    useEffect(() => {

        axios.get('/api/demandesdestage').then(res => {
            if (res.data.status === 200) {

                setDemandeStage(res.data.demandesStage);
                setLoading(false);
            }

        });
    }, []);

    const VoirImageDemandeStage = (e, demandestage) => {
        e.preventDefault();
        window.open(`http://127.0.0.1:8000/${demandestage}`)


    }
    const VoirImageCV = (e, cv) => {
        e.preventDefault();
        window.open(`http://127.0.0.1:8000/${cv}`)

    }
    const VoirImageCIN = (e, cin) => {
        e.preventDefault();
        window.open(`http://127.0.0.1:8000/${cin}`)

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


    const setStagiaireID = (e, id) => {
        e.preventDefault();
        localStorage.setItem('id_stagiaire', id);
    }


    const IdStagiaire = localStorage.getItem('id_stagiaire');
    const informerStagiaire = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('message', NotifInput.message);
        formData.append('Stagiaire_id', IdStagiaire);

        axios.post('/api/informer-stagiaire', formData).then(res => {
            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                setError([]);
                localStorage.removeItem('id_stagiaire');


            } else {
                setError(res.data.errors);

            }

        })
    }







    if (loading) {
        return <Loading />
    }

    else {

        return (
            <div>
                <form onSubmit={informerStagiaire} >

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Informer stagiaire</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">

                                        <div className="col-md-12">
                                            <label className="form-label">Message</label>
                                            <textarea className="form-control" name="message" placeholder='Message' rows="3" onChange={handleNotifInput} value={NotifInput.message} required></textarea>
                                            <small className="text-danger">{errorlist.message}</small>

                                        </div>
                                    </div>

                                </div>

                                <div className="modal-footer">
                                    <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                    <button type="submit" className="btn btn-info">Envoyer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form >
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
                                    title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-5">Demande de stage</h1>, render: demandesStage => {
                                        return (
                                            <span className="text-secondary text-xs font-weight-bold">
                                                <Link to='#' onClick={(e) => VoirImageDemandeStage(e, demandesStage.demandestage)}>
                                                    <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#09288C', marginLeft: '50px' }}>

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-zoom-in" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                                                            <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                                                            <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z" />
                                                        </svg>
                                                    </div>
                                                </Link></span>

                                        )
                                    }



                                },

                                {
                                    title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4 ">Cv</h1>
                                    , render: (demandesStage) => {
                                        return (
                                            <span className="text-secondary text-xs font-weight-bold">
                                                <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#09288C', marginLeft: '20px' }}>

                                                    <Link to='#' onClick={(e) => VoirImageCV(e, demandesStage.cv)}>
                                                        <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#09288C', marginLeft: '10px' }}>

                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-zoom-in" viewBox="0 0 16 16">
                                                                <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                                                                <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                                                                <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z" />
                                                            </svg>
                                                        </div>
                                                    </Link>
                                                </div></span>
                                        )
                                    }




                                },
                                {
                                    title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4 ">CIN</h1>
                                    , render: (demandesStage) => {
                                        return (
                                            <span className="text-secondary text-xs font-weight-bold">
                                                <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#09288C', marginLeft: '20px' }}>

                                                    <Link to='#' onClick={(e) => VoirImageCIN(e, demandesStage.cin)}>
                                                        <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#09288C', marginLeft: '10px' }}>

                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-zoom-in" viewBox="0 0 16 16">
                                                                <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                                                                <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                                                                <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z" />
                                                            </svg>
                                                        </div>
                                                    </Link>
                                                </div></span>
                                        )
                                    }




                                },
                                {
                                    title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-5" >Etat</h1>
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

                                {
                                    title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-7" ></h1>
                                    , render: demandesStage => {
                                        return (
                                            <div className="align-middle text-center text-sm">
                                                {demandesStage.etatdemande === 'Nouvellement créé' ? <Link onClick={(e) => setStagiaireID(e, demandesStage.stagiaire[0].stagiaireId)} data-bs-toggle="modal" data-bs-target="#exampleModal" >
                                                    <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#EC9833', marginLeft: '10px' }}>

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square-text" viewBox="0 0 16 16">
                                                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                                        </svg>
                                                    </div>
                                                </Link> : null}




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

            </div>
        )
    }
}
