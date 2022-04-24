import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import MaterialTable from 'material-table';
import tableIcons from "../../Coordinateur/MaterialTableIcons";
import Loading from '../../../../layouts/Topnet/Loading';

export default function Offres() {
    const [loading, setLoading] = useState(true);

    const [offres, setOffre] = useState([]);
    useEffect(() => {

        axios.get('/api/offres').then(res => {
            if (res.data.status === 200) {

                setOffre(res.data.offres);
                setLoading(false);
            }

        });
    }, []);


    {/* Activer ou Désactiver offre*/ }

    const desactiverOffre = (e, oid) => {
        e.preventDefault();

        axios.put(`/api/desactiver-offre/${oid}`).then(res => {

            if (res.data.status = 200) {
                swal("", res.data.message, "success");
                window.location.reload();
            } else if (res.data.status === 401) {
                swal("", res.data.message, "warning");

            }
        });

    }


    {/* publier offre*/ }

    const publierOffre = (e, oid) => {
        e.preventDefault();

        axios.put(`/api/publier-offre/${oid}`).then(res => {

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
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Sujet de stage</h1>
                                , render: (offres) => {
                                    return (
                                        <div>
                                            <p className="text-xs font-weight-bold mb-0"  >{offres.sujet}</p>
                                        </div>
                                    )
                                }

                            },
                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs  font-weight-bolder opacity-7" >Déscription</h1>
                                , render: (offres) => {
                                    return (
                                        <p className="text-xs font-weight-bold" style={{ width: "200px" }} >{offres.description}</p>)
                                }


                            },

                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Période de stage</h1>, render: offres => {
                                    return (
                                        <h4 className="text-xs text-center text-secondary mb-0">{offres.periode} mois</h4>

                                    )
                                }

                                ,

                                customFilterAndSearch: (term, offres) => ((offres.periode).toLowerCase()).indexOf(term.toLowerCase()) != -1


                            },

                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Domaine et type de stage</h1>, render: offres => {
                                    return (
                                        <div className="d-flex px-2 py-1">

                                            <div className="d-flex flex-column justify-content-center">
                                                <h6 className="mb-0  text-center text-sm">{offres.domaine}</h6>
                                                <p className="text-xs text-center text-secondary mb-0">{offres.type}</p>
                                            </div>
                                        </div>

                                    )
                                }

                                ,

                                customFilterAndSearch: (term, offres) => ((offres.domaine + ' ' + offres.type)).toLowerCase().indexOf(term.toLowerCase()) != -1


                            },
                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Technologies</h1>, render: offres => {
                                    return (
                                        <span className="text-xs text-secondary mb-0">{offres.technologies}</span>

                                    )
                                }

                                ,

                                customFilterAndSearch: (term, offres) => ((offres.technologies).toLowerCase()).indexOf(term.toLowerCase()) != -1


                            },


                            {
                                title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 " style={{ marginLeft: '30px' }}>Etat offre</h1>, render: offres => {
                                    return (
                                        <div className="text-xs text-secondary mb-0">

                                            <Link to='#' onClick={(e) => desactiverOffre(e, offres._id.$oid)}>
                                                {offres.etatoffre == 'inactive' ?
                                                    <button className="btn btn-danger">Désactivé</button> :
                                                    <button className="btn btn-success">Activé</button>}
                                            </Link>                                        </div>
                                    );
                                }
                            },
                            {
                                title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 " style={{ marginLeft: '30px' }}>Etat partage</h1>, render: offres => {
                                    return (
                                        <div className="text-xs text-secondary mb-0">
                                            <Link to='#' onClick={(e) => publierOffre(e, offres._id.$oid)}>
                                                {offres.etatpartage == 'unpublished' ?
                                                    <button className="btn btn-primary">Non publiée</button>
                                                    :
                                                    <button className="btn btn-success">Publiée</button>}
                                            </Link>
                                        </div>
                                    );
                                }
                            },

                            {
                                title: <h1 className="text-secondary opacity-7"></h1>, render: offres => {
                                    return (
                                        <Link to={`edit-offre/${offres._id.$oid}`} >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-tools" viewBox="0 0 16 16">
                                                <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z" />
                                            </svg>
                                        </Link>)
                                },

                            },


                        ]

                        }
                        data={offres}
                        title={<h6>Liste offres</h6>}
                        icons={tableIcons}

                    />
                </div>
            </div>
        )
    }
}