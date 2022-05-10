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

                                <option value={user.direction}>{user.direction}</option>

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
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{offre.sujet}</h5>
                                            <h6 className="card-subtitle mb-2 " style={{ color: '#ef8e1f' }}>{offre.periode} mois</h6>
                                            <p className="card-text overflow-auto" style={{ height: '150px', overflowY: 'scroll' }}>{offre.description}</p>

                                            <p className="card-text font-weight-bold">
                                                <span style={{ color: '#111c6b' }}>Technologies: </span>
                                                <span className="badge bg-light text-dark" style={{ whiteSpace: 'normal' }}> {offre.technologies}</span>

                                            </p>
                                            <hr className="my-4" />
                                            <Link to='#' onClick={(e) => publierOffre(e, offre._id.$oid)}>
                                                {offre.etatpartage == 'unpublished' ?
                                                    <button className="btn btn-info">Publier</button>
                                                    :
                                                    <button className="btn btn-success">Publiée</button>}
                                            </Link>
                                            <Link to='#' onClick={(e) => desactiverOffre(e, offre._id.$oid)} style={{ marginLeft: "20px" }}>
                                                {offre.etatoffre == 'inactive' ?
                                                    <button className="btn btn-danger">Désactivé</button> :
                                                    <button className="btn btn-success">Activé</button>}
                                            </Link>
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