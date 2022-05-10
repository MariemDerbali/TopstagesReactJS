import React, { useEffect, useState } from 'react'
import axios from "axios";
import swal from 'sweetalert';
import Loading from '../../layouts/Topnet/Loading';
import { Link } from 'react-router-dom';

//Profil pour tous les utilisateurs
export default function Profil() {


    //Le useState() est un Hook qui vous permet d'avoir des variables d'état dans les composants fonctionnels.
    // Le premier élément est l’état initial et le second est une fonction qui est utilisée pour mettre à jour l’état.


    //Varibles d'état pour obtenir l'utilisateur authentifié
    const [user, setUser] = useState([]);
    //Variables d'état pour afficher le spinner qui indique le chargement de la page
    const [loading, setLoading] = useState(true);
    //varibale d'état pour les erreurs des données saisies
    const [errorlist, setError] = useState([]);


    //On utilise ce Hook -> useEFect() pour indiquer à React que notre composant doit exécuter quelque chose après chaque affichage
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

    //Variables d'état pour obtenir les informations de profil de l'utilisateur 
    const [ProfileUserInput, setProfileUser] = useState({
        nom: '',
        prenom: '',
        email: '',
        adresse: '',
        tel: '',
        role_id: '',
        departement: '',
        direction: '',

    });

    //fonction pour afficher les informations de profil dans le formulaire
    const showFormUpdateProfil = (e, _id) => {

        e.preventDefault();//C'est une méthode présente dans l'interface événementielle. Cette méthode empêche le navigateur d'exécuter le comportement par défaut de l'élément sélectionné. Cette méthode ne peut annuler l'événement que si l'événement est annulable.

        //API pour obtenir les informations de profil de l'utilisateur
        axios.get(`/api/edit-profil/${_id}`).then(res => {
            if (res.data.status === 200) {//si l'utilisateur est trouvé
                //stockage de l'utilisateur  dans les variables d'état
                setProfileUser(res.data.user);
            } else if (res.data.status === 404) {//si l'utilisateur non trouvé
                //afficher un message d'erreur
                swal("", res.data.message, "error");
            }
            //arrêter le chargement de la page
            setLoading(false);
        });

    }

    //Puisque la valeur du champ est en permanence pilotée par l’état React.
    //Pour mettre à jour l'état local React
    const handleProfileInput = (e) => {
        e.persist();//cela devrait être appelé pour supprimer l'événement en cours du pool.

        //Stocker les valeurs saisies des champs dans les variables d'état
        setProfileUser({ ...ProfileUserInput, [e.target.name]: e.target.value });
    }


    //variables d'état pour obtenir l'image saisie
    const [ProfilPicture, setProfilPicture] = useState([]);
    //Pour mettre à jour l'état local React
    const handleImage = (e) => {
        //Stocker le valeur saisie de champ image dans les variables d'état
        setProfilPicture({ image: e.target.files[0] });
    }


    //Fonction pour mettre à jour le profil
    const updateProfil = (e) => {
        e.preventDefault();//C'est une méthode présente dans l'interface événementielle. Cette méthode empêche le navigateur d'exécuter le comportement par défaut de l'élément sélectionné. Cette méthode ne peut annuler l'événement que si l'événement est annulable.

        const user_id = user._id//obtenir l'id de l'utilisateur

        // l'objet FormData sera rempli avec les clés/valeurs du formulaire en utilisant les noms de propriétés de chaque élément pour clé et les valeurs soumises. Cela encodera aussi le contenu des fichiers.
        const formData = new FormData();
        formData.append('image', ProfilPicture.image);
        formData.append('role_id', user.role_id);
        formData.append('departement', ProfileUserInput.departement);
        formData.append('direction', ProfileUserInput.direction);
        formData.append('nom', ProfileUserInput.nom);
        formData.append('prenom', ProfileUserInput.prenom);
        formData.append('tel', ProfileUserInput.tel);
        formData.append('adresse', ProfileUserInput.adresse);
        formData.append('email', ProfileUserInput.email);


        //l'API de mettre à jour le profil
        axios.post(`/api/profil/${user_id}`, formData).then(res => {

            if (res.data.status === 200) {//si le profil est mis à jour avec succès
                //Afficher un message de succès 
                swal("", res.data.message, "success");
                //rafraîchissement de la page
                window.location.reload();
                //puisqu'il n'y a pas des erreurs des données saisies, stocker donc une liste vide pour les erreurs dans les variables d'état
                setError([]);
            } else if (res.data.status === 422) {//en cas des erreurs des données saisies, stocker une liste des erreurs dans les variables d'état
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {//Afficher un message d'erreur si l'utilisateur est non trouvé
                swal("", res.data.message, "error");
            }
        });
    }

    //si la page est en cours de chargement, donc afficher un spinner
    if (loading) {
        <Loading />
    }


    return (
        <div>
            <div className="container-fluid mb-4">
                <div className="page-header min-height-200 border-radius-xl mt-4" style={{ backgroundImage: `url("../assets/img/curved-images/curved14.jpg")`, backgroundPosition: "50%" }}>
                    <span className="mask opacity-6"></span>
                </div>
                <div className="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
                    {/*si la page est en cours de chargement, donc afficher un spinner*/}
                    {loading ? <Loading />
                        :/*sinon afficher les informations de profil dans le formulaire*/
                        <div className="row">
                            <div className="col-6" >
                                <div className="avatar avatar-xl position-relative">
                                    <img src={`http://127.0.0.1:8000/${user.image}`} alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                                </div>

                                <div>
                                    <div className="h-100">
                                        <h5 className="mb-1">
                                            {`${user.nom} ${user.prenom}`}
                                        </h5>
                                        <p className="mb-0 font-weight-bold text-sm">
                                            {user.role_id}
                                        </p>
                                    </div>
                                </div>
                            </div>


                            <div className="col-6 " style={{ marginLeft: '40%', margin: '0' }}>
                                <div  >
                                    <div className="row">
                                        <div className="col-md-8 d-flex align-items-center">
                                        </div>
                                        <div className="col-md-4 text-end">
                                            <Link to="#" onClick={(e) => showFormUpdateProfil(e, user._id)}>
                                                <i className="fas fa-user-edit text-secondary text-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-placement="top" title="Edit Profile"></i>
                                            </Link>
                                        </div>


                                        <ul style={{ listStyle: 'none' }} >
                                            <li className="border-0 ps-0 text-sm mb-2"><strong className="text-dark">Département:</strong> &nbsp; {user.departement}</li>
                                            <li className="border-0 ps-0 text-sm mb-2"><strong className="text-dark">Direction:</strong> &nbsp; {user.direction}</li>

                                            <li className="  border-0 ps-0 text-sm mb-2"><strong className="text-dark">Téléphone:</strong> &nbsp;{user.tel}</li>
                                            <li className="  border-0 ps-0 text-sm mb-2"><strong className="text-dark">E-mail:</strong> &nbsp; {user.email}</li>
                                            <li className="  border-0 ps-0 text-sm mb-2"><strong className="text-dark">Adresse:</strong> &nbsp; {user.adresse}</li>
                                            <li className="  border-0 ps-0 pb-0">
                                                <strong className="text-dark text-sm">Réseaux sociaux:</strong> &nbsp;
                                                <a className="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0" href="#">
                                                    <i className="fab fa-facebook fa-lg"></i>
                                                </a>
                                                <a className="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0" href="#">
                                                    <i className="fab fa-twitter fa-lg"></i>
                                                </a>
                                                <a className="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0" href="#">
                                                    <i className="fab fa-instagram fa-lg"></i>
                                                </a>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>}

                </div>
            </div>

            <div className="row mb-4">
                <div className="col-6">
                    <form onSubmit={updateProfil} >
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modifier profile</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">

                                        <div className='row'>


                                            <div className="col-md-6 ">
                                                <label className="form-label">Nom</label>
                                                <input required onChange={handleProfileInput} value={ProfileUserInput.nom} type="text" name="nom" className="form-control" placeholder='Nom' />
                                                <small className="text-danger">{errorlist.nom}</small>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Prénom</label>
                                                <input required onChange={handleProfileInput} value={ProfileUserInput.prenom} type="text" name="prenom" className="form-control" placeholder='Prénom' />
                                                <small className="text-danger">{errorlist.prenom}</small>
                                            </div>
                                        </div>

                                        <div className='row'>


                                            <div className="col-md-6">
                                                <label className="form-label">Email</label>
                                                <input required onChange={handleProfileInput} value={ProfileUserInput.email} type="email" name="email" className="form-control" placeholder='Email' />
                                                <small className="text-danger">{errorlist.email}</small>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Adresse</label>
                                                <input required onChange={handleProfileInput} value={ProfileUserInput.adresse} type="text" name="adresse" className="form-control" placeholder="Adresse" />
                                                <small className="text-danger">{errorlist.adresse}</small>
                                            </div>

                                        </div>
                                        <div className='row'>




                                            <div className="col-md-6">
                                                <label className="form-label">Tél</label>
                                                <input required onChange={handleProfileInput} value={ProfileUserInput.tel} type="text" name="tel" className="form-control" placeholder="Tél" />
                                                <small className="text-danger">{errorlist.tel}</small>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Département</label>
                                                <input required type="text" name="departement" onChange={handleProfileInput} value={ProfileUserInput.departement} className="form-control" placeholder='Département' disabled />
                                                <small className="text-danger">{errorlist.departement}</small>
                                            </div>
                                        </div>
                                        <div className='row'>

                                            <div className="col-md-6">
                                                <label className="form-label">Direction</label>
                                                <input required type="text" name="direction" onChange={handleProfileInput} value={ProfileUserInput.direction} className="form-control" placeholder='Direction' disabled />
                                                <small className="text-danger">{errorlist.direction}</small>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Image</label>
                                                <input onChange={handleImage} name="image" className="form-control" type="file" id="formFile" />
                                                <small className="text-danger">{errorlist.image}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-info">Modifier</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>





            </div>
        </div>



    )
}
