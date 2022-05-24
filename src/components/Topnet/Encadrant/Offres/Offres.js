import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Loading from '../../../../layouts/Topnet/Loading';

export default function Offres() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        //l'API de l'utilisateur authentifié actuel
        axios.get('/api/currentuser').then(res => {
            if (res.data.status === 200) {//si l'utilisateur est trouvé

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


    const [type, setType] = useState("");
    const [domaine, setDomaine] = useState("");


    const [OffreDemandee, setOffreDemandee] = useState({
        domaine: '',
        type: '',
    });
    const handleSelectType = (event) => {
        event.persist();
        setType(event.target.value);
        setOffreDemandee({ ...OffreDemandee, [event.target.name]: event.target.value });
    };
    const handleSelectDomaine = (event) => {
        event.persist();
        setDomaine(event.target.value);
        setOffreDemandee({ ...OffreDemandee, [event.target.name]: event.target.value });

    };


    const filteredOffres = offres.filter(
        offre => (offre.type).toLowerCase().includes(type.toLowerCase()) &&
            (offre.domaine).toLowerCase().includes(domaine.toLowerCase())
    );



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

            <div>

                <div className="container" style={{ width: '80%' }}>
                    <div className="row shadow-lg p-3 mb-5 bg-body rounded justify-content-center">
                        <div className='col-md-4'>
                            <select className="form-control w-100 mt-2" name="domaine" value={domaine} onChange={handleSelectDomaine}>

                                <option value="">Domaine de stage</option>

                                <option value={user.service}>{user.service}</option>

                            </select>
                        </div>
                        <div className="col-md-4 ">
                            <select className="form-control w-100 mt-2" name="type" value={type} onChange={handleSelectType}>

                                <option value="">Type de stage</option>
                                <option>Stage PFE ingénieur</option>
                                <option>Stage PFE licence</option>
                                <option>Stage PFE master</option>
                                <option>Stage Perfectionnement</option>
                                <option>Stage Initiation</option>


                            </select>



                        </div>
                    </div>

                </div >


                <div className='row'>
                    {filteredOffres.map((offre) => {
                        return (

                            <div className="col-md-6  ">
                                <div data-aos='zoom-in' className=' p-3 mb-5  rounded h-100' >
                                    <div className="card h-80">
                                        <div className="card-body">

                                            <h5 className="card-title">{offre.sujet}</h5>

                                            {user.role_id === "ChefDepartement" ?
                                                <div >
                                                    <span class="badge mb-2" style={{ backgroundColor: '#8392ab9c' }}>
                                                        <span style={{ color: "#3a416f" }}>Encadrant: </span>
                                                        {offre.encadrant[0].nom} {offre.encadrant[0].prenom} <br /><br />
                                                        <span style={{ color: "#3a416f" }}>Téléphone: </span> {offre.encadrant[0].tel} <br /><br />
                                                        <span style={{ color: "#3a416f" }}>E-mail: </span> {offre.encadrant[0].email}</span>
                                                    <h6 className="card-subtitle mb-2 " style={{ color: '#ef8e1f' }}>{offre.periode} mois</h6>
                                                </div>
                                                : <h6 className="card-subtitle mb-2 " style={{ color: '#ef8e1f' }}>{offre.periode} mois</h6>}
                                            <p className="card-text overflow-auto" style={{ height: '150px', overflowY: 'scroll' }}>{offre.description}</p>

                                            <p className="card-text font-weight-bold">
                                                <span style={{ color: '#111c6b' }}>Technologies: </span>
                                                <span className="badge bg-light text-dark" style={{ whiteSpace: 'normal' }}> {offre.technologies}</span>

                                            </p>
                                            <hr className="my-4" />
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    <Link to='#' onClick={(e) => publierOffre(e, offre._id.$oid)}>
                                                        {offre.etatpartage == 'unpublished' ?
                                                            <button className="btn btn-info">Publier</button>
                                                            :
                                                            <button className="btn btn-success">Publiée</button>}
                                                    </Link>
                                                </div>
                                                <div className='col-md-4'><Link to='#' onClick={(e) => desactiverOffre(e, offre._id.$oid)} style={{ marginLeft: "20px" }}>
                                                    {offre.etatoffre == 'inactive' ?
                                                        <button className="btn btn-danger">Désactivé</button> :
                                                        <button className="btn btn-success">Activé</button>}
                                                </Link>
                                                </div>
                                                <div className='col-md-4 mt-2'>
                                                    <Link to={`edit-offre/${offre._id.$oid}`} >
                                                        <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#344767', marginLeft: '10px' }}>

                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools" viewBox="0 0 16 16">
                                                                <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z" />
                                                            </svg>

                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>





                                        </div>
                                    </div>
                                </div>

                            </div>

                        )
                    })
                    }
                </div>
            </div>

        )
    }
}