import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import "./css/Homestyle.css"
import swal from 'sweetalert';

export default function Offresdestage() {



    // Le hook useHistory() renvoie une instance history , qui contient l'emplacement actuel (URL) du composant que nous pouvons utiliser pour naviguer entre les pages.
    const history = useHistory();


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




    //Variables d'état pour obtenir la liste des départements
    const [directionlist, setDirectionlist] = useState([

    ]);
    useEffect(() => {

        //l'API pour obtenir la liste des directions
        axios.get('/api/homepage-directions').then(res => {
            if (res.data.status === 200) {
                setDirectionlist(res.data.directions);
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



    const submitOffreDemandee = (e) => {
        e.preventDefault();//C'est une méthode présente dans l'interface événementielle. Cette méthode empêche le navigateur d'exécuter le comportement par défaut de l'élément sélectionné. Cette méthode ne peut annuler l'événement que si l'événement est annulable.

        // l'objet FormData sera rempli avec les clés/valeurs du formulaire en utilisant les noms de propriétés de chaque élément pour clé et les valeurs soumises. Cela encodera aussi le contenu des fichiers.
        const formData = new FormData();
        formData.append('domaine', OffreDemandee.domaine);
        formData.append('type', OffreDemandee.type);
        formData.append('stagiaireID', stagiaire._id);



        //l'API pour créer un département
        axios.post('/api/homepage-postuler', formData).then(res => {
            if (res.data.status === 200) {

                history.push(`/test-psychotechnique/${stagiaire._id}`);

            } else if (res.data.status === 422) {//en cas des erreurs des données saisies, stocker une liste des erreurs dans les variables d'état
                swal("", res.data.message, "warning");
            }
        })
    }




    return (
        <div>
            <form className="row" onSubmit={submitOffreDemandee} >

                <div className="container d-flex align-items-center mb-3 mt-3" style={{ marginLeft: "20px" }}>

                    <h1 className="logo me-auto"><Link to="/">
                        <img src="../assets/img/logos/logo-topstages.png" className="navbarHome-brand-img h-100" style={{ maxHeight: '90px' }} alt="main_logo" />
                    </Link></h1>

                </div>
                <div className="container" style={{ width: '70%' }}>
                    <div className="row shadow-lg p-3 mb-5 bg-body rounded justify-content-center">
                        <div className='col-md-3'>
                            <select className="form-control w-100 mt-2" name="domaine" value={domaine} onChange={handleSelectDomaine}>

                                <option value="">Domaine de stage</option>
                                {//obtenir la liste des directions
                                    directionlist.map((direction, index) => {
                                        return (
                                            <option value={direction.id} key={index}>{direction.nomdirection}</option>


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
                        {(type === 'Stage initiation' || type === 'Stage Perfectionnement') && filteredOffres.length === 0 ?
                            <div className="col-md-6 " data-aos="fade-down" style={{ textAlign: 'center' }}>
                                {localStorage.getItem('auth_token') ?
                                    <Link to={`/test-psychotechnique/${stagiaire._id}`} ><button type='button' className='btn btn-primary ' >Cliquez ici pour postuler!</button></Link> :
                                    <Link to="/auth" ><button type='button' className='btn btn-primary ' >Cliquez ici pour postuler!</button></Link>
                                }
                            </div> :
                            /**s'il n'y a pas de sujet  pour le type de stage PFE*/

                            type === 'Stage PFE licence' || type === 'Stage PFE master' || type === 'Stage PFE ingénieur' && filteredOffres.length == 0 ?
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
                                                        <h6 className="card-subtitle mb-2 " style={{ color: '#ef8e1f' }}>{offre.periode} mois</h6>
                                                        <p className="card-text overflow-auto" style={{ height: '150px', overflowY: 'scroll' }}>{offre.description}</p>

                                                        <p className="card-text font-weight-bold">
                                                            <span style={{ color: '#111c6b' }}>Technologies: </span>
                                                            <span className="badge bg-light text-dark" style={{ whiteSpace: 'normal' }}> {offre.technologies}</span>

                                                        </p>
                                                        <hr className="my-4" />

                                                        <button type="submit" className="btn btn-info ">Postuler!</button>

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
