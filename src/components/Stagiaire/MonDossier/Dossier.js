import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../../layouts/Topnet/Loading';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from "../../Topnet/Coordinateur/MaterialTableIcons";
import swal from 'sweetalert';

export default function Dossier() {
    const [errorlist, setError] = useState([]);

    const [loading, setLoading] = useState(true);

    const [notifExist, setNotifExist] = useState(false);

    const [demandesStage, setDemandeStage] = useState([]);

    const [notif, setNotif] = useState([]);

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

        axios.get('/api/notif').then(res => {
            if (res.data.status === 200) {

                setNotif(res.data.notif);
                setNotifExist(true);
                setLoading(false);

            }

        });

    }, []);

    const setPostID = (e, id) => {
        e.preventDefault();
        localStorage.setItem('id_post', id);
    }

    const [file1, setCvFile] = useState([]);
    const handle1 = (e) => {
        setCvFile({ cv: e.target.files[0] });
    }
    const [file2, setFicherepFile] = useState([]);
    const handle2 = (e) => {
        setFicherepFile({ ficherep: e.target.files[0] });
    }

    const updateDocuments = (e) => {
        e.preventDefault();

        const postID = localStorage.getItem('id_post');

        const formData = new FormData();
        formData.append('cv', file1.cv);
        formData.append('ficherep', file2.ficherep);


        axios.post(`/api/documents/${postID}`, formData).then(res => {

            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                setError([]);
                window.location.reload();
            }
            else if (res.data.status === 404) {
                swal("", res.data.message, "error");
            }
        });
    }


    if (loading) {
        return <Loading />
    }

    else {

        return (
            <div>

                {
                    notifExist ?
                        <div className="alert alert-danger" role="alert" style={{ color: '#fff' }}>
                            {notif.message}
                        </div> :
                        null
                }

                <form onSubmit={updateDocuments} >

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Modifier documents</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6 ">
                                            <label className="form-label">CV</label>
                                            <input name="cv" onChange={handle1} className="form-control" type="file" id="formFile" />
                                            <small className="text-danger">{errorlist.cv}</small>
                                        </div>

                                        <div className="col-md-6 ">
                                            <label className="form-label">Fiche de réponse</label>
                                            <input name="ficherep" onChange={handle2} className="form-control" type="file" id="formFile" />
                                            <small className="text-danger">{errorlist.ficherep}</small>
                                        </div>

                                    </div>

                                </div>

                                <div className="modal-footer">
                                    <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                    <button type="submit" className="btn btn-info">Modifier</button>
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
                                            <span className="text-secondary text-xs font-weight-bold"> <Link to='#' onClick={(e) => VoirImageFiche(e, demandesStage.ficherep)}>
                                                <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#09288C', marginLeft: '40px' }}>

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
                                                <Link to='#' onClick={(e) => VoirImageCV(e, demandesStage.cv)}>
                                                    <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#09288C', marginLeft: '10px' }}>

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
                                    title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-7" >Etat</h1>
                                    , render: demandesStage => {
                                        return (
                                            <div className="align-middle text-center text-sm">

                                                {demandesStage.etatdemande === 'Nouvellement créé' ?
                                                    <div>
                                                        <span className="badge rounded-pill bg-light text-dark">
                                                            Votre dossier vient d'être envoyé!
                                                        </span>

                                                    </div>
                                                    : demandesStage.etatdemande === 'En cours de traitement' ?
                                                        <span className="badge rounded-pill bg-info text-dark">
                                                            Votre dossier est en cours de traitement</span>
                                                        :
                                                        <span className="badge rounded-pill bg-success">
                                                            Votre dossier est traité
                                                        </span>


                                                }

                                            </div>
                                        );
                                    }
                                },

                                {
                                    title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-5" ></h1>
                                    , render: demandesStage => {
                                        return (
                                            demandesStage.etatdemande === 'Nouvellement créé' ?
                                                <Link to="#"
                                                    onClick={(e) => setPostID(e, demandesStage._id)}

                                                    data-bs-toggle="modal" data-bs-target="#exampleModal" >
                                                    <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#09288C' }}>

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-tools" viewBox="0 0 16 16">
                                                            <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z" />
                                                        </svg>
                                                    </div>
                                                </Link> : null
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
