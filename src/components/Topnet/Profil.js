import React, { useEffect, useState } from 'react'
import axios from "axios";
import swal from 'sweetalert';
import Loading from '../../layouts/Topnet/Loading';
import { Link } from 'react-router-dom';

//Profil pour tous les utilisateurs
export default function Profil() {


    //Le useState() est un Hook qui vous permet d'avoir des variables d'état dans les composants fonctionnels.
    // Le premier élément est l’état initial et le second est une fonction qui est utilisée pour mettre à jour l’état.


    //Varibles d'état pour obtenir la liste des utilisateurs
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
        description: '',

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
        formData.append('description', ProfileUserInput.description);
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
                <div className="page-header min-height-300 border-radius-xl mt-4" style={{ backgroundImage: `url("../assets/img/curved-images/curved0.jpg")`, backgroundPosition: "50%" }}>
                    <span className="mask bg-gradient-primary opacity-6"></span>
                </div>
                <div className="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
                    <div className="row gx-4">
                        {/*si la page est en cours de chargement, donc afficher un spinner*/}
                        {loading ? <Loading />
                            :/*sinon afficher les informations de profil dans le formulaire*/
                            <div> <div className="col-auto">
                                <div className="avatar avatar-xl position-relative">
                                    <img src={`http://127.0.0.1:8000/${user.image}`} alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                                </div>
                            </div>
                                <div className="col-auto my-auto">
                                    <div className="h-100">
                                        <h5 className="mb-1">
                                            {`${user.nom} ${user.prenom}`}
                                        </h5>
                                        <p className="mb-0 font-weight-bold text-sm">
                                            {user.role_id}
                                        </p>
                                    </div>
                                </div></div>}
                        <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                            <div className="nav-wrapper position-relative end-0">
                                <ul className="nav nav-pills nav-fill p-1 bg-transparent" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link mb-0 px-0 py-1 active " data-bs-toggle="tab" href="#" role="tab" aria-selected="true">
                                            <svg className="text-dark" width="16px" height="16px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                    <g transform="translate(-2319.000000, -291.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(603.000000, 0.000000)">
                                                                <path className="color-background" d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z">
                                                                </path>
                                                                <path className="color-background" d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z" opacity="0.7"></path>
                                                                <path className="color-background" d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z" opacity="0.7"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                            <span className="ms-1">App</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link mb-0 px-0 py-1 " data-bs-toggle="tab" href="#" role="tab" aria-selected="false">
                                            <svg className="text-dark" width="16px" height="16px" viewBox="0 0 40 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                <title>document</title>
                                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                    <g transform="translate(-1870.000000, -591.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(154.000000, 300.000000)">
                                                                <path className="color-background" d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z" opacity="0.603585379"></path>
                                                                <path className="color-background" d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                            <span className="ms-1">Messages</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link mb-0 px-0 py-1 " data-bs-toggle="tab" href="#" role="tab" aria-selected="false">
                                            <svg className="text-dark" width="16px" height="16px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                <title>settings</title>
                                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                    <g transform="translate(-2020.000000, -442.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(304.000000, 151.000000)">
                                                                <polygon className="color-background" opacity="0.596981957" points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667">
                                                                </polygon>
                                                                <path className="color-background" d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z" opacity="0.596981957"></path>
                                                                <path className="color-background" d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                            <span className="ms-1">Settings</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
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
                                                <label className="form-label">Déscription</label>
                                                <input required onChange={handleProfileInput} value={ProfileUserInput.description} type="text" name="description" className="form-control" placeholder='Déscription' />
                                                <small className="text-danger">{errorlist.description}</small>

                                            </div>

                                            <div className="col-md-6 ">
                                                <label className="form-label">Nom</label>
                                                <input required onChange={handleProfileInput} value={ProfileUserInput.nom} type="text" name="nom" className="form-control" placeholder='Nom' />
                                                <small className="text-danger">{errorlist.nom}</small>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className="col-md-6">
                                                <label className="form-label">Prénom</label>
                                                <input required onChange={handleProfileInput} value={ProfileUserInput.prenom} type="text" name="prenom" className="form-control" placeholder='Prénom' />
                                                <small className="text-danger">{errorlist.prenom}</small>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Email</label>
                                                <input required onChange={handleProfileInput} value={ProfileUserInput.email} type="email" name="email" className="form-control" placeholder='Email' />
                                                <small className="text-danger">{errorlist.email}</small>
                                            </div>

                                        </div>
                                        <div className='row'>
                                            <div className="col-md-6">
                                                <label className="form-label">Adresse</label>
                                                <input required onChange={handleProfileInput} value={ProfileUserInput.adresse} type="text" name="adresse" className="form-control" placeholder="Adresse" />
                                                <small className="text-danger">{errorlist.adresse}</small>
                                            </div>



                                            <div className="col-md-6">
                                                <label className="form-label">Tél</label>
                                                <input required onChange={handleProfileInput} value={ProfileUserInput.tel} type="text" name="tel" className="form-control" placeholder="Tél" />
                                                <small className="text-danger">{errorlist.tel}</small>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="col-md-6">
                                                <label className="form-label">Département</label>
                                                <input required type="text" name="departement" onChange={handleProfileInput} value={ProfileUserInput.departement} className="form-control" placeholder='Département' disabled />
                                                <small className="text-danger">{errorlist.departement}</small>
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
                                        <button type="submit" className="btn btn-primary">Modifier</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>




                <div className="col-12 ">
                    <div className="card h-100">
                        <div className="card-header pb-0 p-3">
                            <div className="row">
                                <div className="col-md-8 d-flex align-items-center">
                                    <h6 className="mb-0">Information profile</h6>
                                </div>
                                <div className="col-md-4 text-end">
                                    <Link to="#" onClick={(e) => showFormUpdateProfil(e, user._id)}>
                                        <i className="fas fa-user-edit text-secondary text-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-placement="top" title="Edit Profile"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-3">
                            <p className="text-sm">
                                {user.description}
                            </p>
                            <hr className="horizontal gray-light my-4" />
                            <ul className="list-group">
                                <li className="list-group-item border-0 ps-0 pt-0 text-sm"><strong className="text-dark">Nom et prénom:</strong> &nbsp;{`${user.nom} ${user.prenom}`}</li>
                                <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Département:</strong> &nbsp; {user.departement}</li>

                                <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Téléphone:</strong> &nbsp;{user.tel}</li>
                                <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">E-mail:</strong> &nbsp; {user.email}</li>
                                <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Adresse:</strong> &nbsp; {user.adresse}</li>
                                <li className="list-group-item border-0 ps-0 pb-0">
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


            </div>
        </div>



    )
}
