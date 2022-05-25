import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import "./css/Homestyle.css"
import swal from 'sweetalert';

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Loading from '../Topnet/Loading';


export default function Offresdestage() {



    // Le hook useHistory() renvoie une instance history , qui contient l'emplacement actuel (URL) du composant que nous pouvons utiliser pour naviguer entre les pages.
    const history = useHistory();

    const [loading, setLoading] = useState(true);

    //Variables d'état pour obtenir la liste des offres
    const [offreslist, setOffreslist] = useState([

    ]);
    //varibale d'état pour les erreurs

    //On utilise ce Hook -> useEFect() pour indiquer à React que notre composant doit exécuter quelque chose après chaque affichage
    useEffect(() => {

        //l'API pour obtenir la liste des offres
        axios.get('/api/homepage-getoffres').then(res => {
            if (res.data.status === 200) {//si nous avons obtenu la liste
                //stockage des offres dans les variables détat

                setOffreslist(res.data.offres);
                setLoading(false);
            }
        });


    }, []);

    //Pour filtrer les offres

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


    const filteredOffres = offreslist.filter(
        offre => (offre.type).toLowerCase().includes(type.toLowerCase()) &&
            (offre.domaine).toLowerCase().includes(domaine.toLowerCase())
    );




    //Variables d'état pour obtenir la liste des services
    const [serviceslist, setServicelist] = useState([

    ]);
    useEffect(() => {

        //l'API pour obtenir la liste des services
        axios.get('/api/homepage-services').then(res => {
            if (res.data.status === 200) {
                setServicelist(res.data.services);
            }
        });


    }, []);
    const [stagiaire, setStagiaire] = useState([]);

    useEffect(() => {
        //l'API de stagiaire authentifié actuel
        axios.get('/api/currentstagiaire').then(res => {
            if (res.data.status === 200) {//si l'utilisateur est trouvé

                //stockage de l'utilisateur authentifié actuel dans les variables d'état
                setStagiaire(res.data.currentuser);

                //si l'utilisateur non trouvé 
            } else if (res.data.status === 404) {
                //afficher un message d'erreur
                console.log(res.data.message);
            }
        });
    }, []);



    const submitOffreDemandee = (e, offre) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('domaine', OffreDemandee.domaine);
        formData.append('type', OffreDemandee.type);
        formData.append('stagiaireID', stagiaire._id);

        formData.append('sujet', offre.sujet);
        formData.append('encadrant', offre.encadrant[0].nom + ' ' + offre.encadrant[0].prenom);



        axios.post('/api/homepage-postuler', formData).then(res => {
            if (res.data.status === 200) {

                history.push(`/test-psychotechnique/${stagiaire._id}`);

            } else if (res.data.status === 401) {
                swal("", res.data.message, "warning");
            }
            else {
                swal("", res.data.message, "warning");//en cas des erreurs des données saisies, stocker une liste des erreurs dans les variables d'état
            }
        })
    }

    const submit = (e, offre) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="container h-100" style={{ width: '6000px' }} >
                        <div className="row justify-content-center h-100" >
                            <div className="col-md-6  "   >
                                <div data-aos='zoom-in' className=' p-3 mb-5  rounded h-100' >
                                    <div className="card h-100" style={{ backgroundColor: '#0a1e5e' }}>
                                        <div className="card-body">
                                            <h6 className="card-title" style={{ color: '#fff' }}>Vous êtes sur le point de lancer le test psychotechnique. Vous ne pourrez pas faire de pause. </h6>
                                            <h4 className="card-subtitle mb-2 " style={{ color: '#ef8e1f', textAlign: 'center' }} >Êtes-vous prêt ?</h4>



                                            <hr className="my-4" />

                                            <button className='btn btn-info' onClick={() => {
                                                submitOffreDemandee(e, offre);
                                                onClose();
                                            }}>Commencer le test</button>&nbsp;&nbsp;
                                            <button onClick={onClose} className="btn btn-light ">Quitter</button>

                                        </div>
                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>
                );
            }
        });


    }

    const submitOffreDemandee1 = () => {
        const formData = new FormData();
        formData.append('domaine', OffreDemandee.domaine);
        formData.append('type', OffreDemandee.type);
        formData.append('stagiaireID', stagiaire._id);




        axios.post('/api/homepage-postuler', formData).then(res => {
            if (res.data.status === 200) {

                history.push(`/test-psychotechnique/${stagiaire._id}`);

            } else if (res.data.status === 401) {
                swal("", res.data.message, "warning");
            }
            else {
                swal("", res.data.message, "warning");//en cas des erreurs des données saisies, stocker une liste des erreurs dans les variables d'état
            }
        })
    }


    const submit1 = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="container h-100" style={{ width: '6000px' }} >
                        <div className="row justify-content-center h-100" >
                            <div className="col-md-6  "   >
                                <div data-aos='zoom-in' className=' p-3 mb-5  rounded h-100' >
                                    <div className="card h-100" style={{ backgroundColor: '#0a1e5e' }}>
                                        <div className="card-body">
                                            <h6 className="card-title" style={{ color: '#fff' }}>Vous êtes sur le point de lancer le test psychotechnique. Vous ne pourrez pas faire de pause. </h6>
                                            <h4 className="card-subtitle mb-2 " style={{ color: '#ef8e1f', textAlign: 'center' }} >Êtes-vous prêt ?</h4>



                                            <hr className="my-4" />

                                            <button className='btn btn-info' onClick={() => {
                                                submitOffreDemandee1();
                                                onClose();
                                            }}>Commencer le test</button>&nbsp;&nbsp;
                                            <button onClick={onClose} className="btn btn-light ">Quitter</button>

                                        </div>
                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>
                );
            }
        });


    }

    if (loading) {
        return <div style={{ marginTop: "300px" }}><Loading /></div>
    } else {
        return (
            <div>
                <form className="row"  >

                    <div className="container d-flex align-items-center mb-3 mt-3" style={{ marginLeft: "20px" }}>

                        <h1 className="logo me-auto"><Link to="/">
                            <img src="../assets/img/logos/logo-topstages.png" className="navbarHome-brand-img h-100" style={{ maxHeight: '90px' }} alt="main_logo" />
                        </Link></h1>

                    </div>
                    <div className="container" style={{ width: '70%' }}>
                        <div className="row shadow-lg p-3 mb-5   rounded justify-content-center" style={{ backgroundColor: '#0a1e5e' }}>
                            <div className='col-md-3'>
                                <select className="form-control w-100 mt-2" name="domaine" value={domaine} onChange={handleSelectDomaine}>

                                    <option value="">Domaine de stage</option>
                                    {//obtenir la liste des services
                                        serviceslist.map((service, index) => {
                                            return (
                                                <option value={service.id} key={index}>{service.nomService}</option>


                                            )
                                        })
                                    }


                                </select>
                            </div>
                            <div className="col-md-3 ">
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


                    <div className="container h-100" style={{ width: '80%' }}>
                        <div className="row justify-content-center h-100">
                            {/**s'il n'y a pas de sujet  pour le type de stage initiaton & perfectionnement*/}

                            {(type === 'Stage Initiation' || type === 'Stage Perfectionnement') && filteredOffres.length === 0 ?
                                <div className="col-md-6 " data-aos="fade-down" style={{ textAlign: 'center' }}>

                                    <button type='button' className='btn btn-primary ' onClick={submit1}  >Cliquez ici pour postuler!</button>

                                </div> :
                                /**s'il n'y a pas de sujet  pour le type de stage PFE*/

                                filteredOffres.length == 0 ?
                                    <div className="alert alert-danger" data-aos="zoom-in-right" role="alert" style={{ color: 'white' }}>
                                        Il n'y a pas de sujet pour le moment...veuillez vérifier à nouveau ultérieurement.
                                    </div> :
                                    /**sinon afficher les offres de stage*/
                                    (filteredOffres.map((offre, index) => {

                                        return (
                                            <div className="col-md-6  " key={index}  >
                                                <div data-aos='zoom-in' className=' p-3 mb-5  rounded h-100' >
                                                    <div className="card h-100">
                                                        <div className="card-body">
                                                            <h5 className="card-title">{offre.sujet}</h5>
                                                            <h6 className="card-subtitle mb-2 " style={{ color: '#ef8e1f' }}>
                                                                {offre.periode} mois</h6>
                                                            <p className="card-text overflow-auto" style={{ height: '150px', overflowY: 'scroll' }}>{offre.description}</p>

                                                            <p className="card-text font-weight-bold">
                                                                <span style={{ color: '#111c6b' }}>Technologies: </span>
                                                                <span className="badge bg-light text-dark" style={{ whiteSpace: 'normal' }}> {offre.technologies}</span>

                                                            </p>
                                                            <hr className="my-4" />

                                                            <button type="button" className="btn btn-info " onClick={(e) => submit(e, offre)}>Choisir</button>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        )

                                    })
                                    )
                            }






                        </div>
                    </div>
                </form>
            </div >

        )
    }

}
