import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Loading from '../../../../layouts/Topnet/Loading';

//pour modifier un utilisateur
export default function Edituser(props) {


    //Le useState() est un Hook qui vous permet d'avoir des variables d'état dans les composants fonctionnels.
    // Le premier élément est l’état initial et le second est une fonction qui est utilisée pour mettre à jour l’état.

    //varibale d'état pour les erreurs des données saisies
    const [errorlist, setError] = useState([]);

    //Variables d'état pour afficher le spinner qui indique le chargement de la page
    const [loading, setLoading] = useState(true);

    // Le hook useHistory() renvoie une instance history , qui contient l'emplacement actuel (URL) du composant que nous pouvons utiliser pour naviguer entre les pages.
    const history = useHistory();


    //Variables d'état pour obtenir la liste des rôles
    const [roleslist, setRoleslist] = useState([

    ]);

    //Variables d'état pour obtenir la liste des départements
    const [depslist, setDepslist] = useState([

    ]);

    //Variables d'état pour obtenir la liste des directions
    const [directionlist, setDirectionlist] = useState([

    ]);


    //On utilise ce Hook -> useEFect() pour indiquer à React que notre composant doit exécuter quelque chose après chaque affichage
    useEffect(() => {
        //l'API pour obtenir la liste des rôles
        axios.get('/api/roles').then(res => {
            if (res.data.status === 200) {//si nous avons obtenu la liste
                //stockage des rôles dans les variables d'état
                setRoleslist(res.data.roles);
            }
        });
        //l'API pour obtenir la liste des départements
        axios.get('/api/departements').then(res => {
            if (res.data.status === 200) {//si nous avons obtenu la liste

                //stockage des départements dans les variables détat
                setDepslist(res.data.deps);
            }
        });

        //l'API pour obtenir la liste des directions
        axios.get('/api/user-directions').then(res => {
            if (res.data.status === 200) {//si nous avons obtenu la liste
                //stockage des directions dans les variables détat
                setDirectionlist(res.data.directions);
            }
        });


        const user_id = props.match.params._id//obtenir l'id de l'utilisateur à partir des paramètres d'URL
        //l'API pour obtenir un utilisateur
        axios.get(`/api/edit-user/${user_id}`).then(res => {
            if (res.data.status === 200) {//si l'utilisateur est trouvé
                //stockage de l'utilisateur  dans les variables d'état
                setUser(res.data.user);
            } else if (res.data.status === 404) {//si l'utilisateur est non trouvé
                swal("", res.data.message, "error");//afficher un message d'erreur
                history.push('/coordinateur/Users');//rediriger le coordinateur vers la page de la liste des utilisateurs
            }
            //arrêter le chargement de la page
            setLoading(false);
        });

    }, [props.match.params._id, history]);


    //variables d'état pour obtenir les valeurs saisies des champs
    const [UserInput, setUser] = useState({
        matricule: '',
        nom: '',
        prenom: '',
        email: '',
        password: '',
        adresse: '',
        loginTOPNET: '',
        tel: '',
        role_id: '',
        departement: '',
        direction: '',


    });


    //Puisque la valeur du champ est en permanence pilotée par l’état React.
    //Pour mettre à jour l'état local React
    const handleInput = (e) => {
        e.persist();//cela devrait être appelé pour supprimer l'événement en cours du pool.
        setUser({ ...UserInput, [e.target.name]: e.target.value });//Stocker les valeurs saisies des champs dans les variables d'état

    }

    //variables d'état pour obtenir l'image saisie
    const [picture, setPicture] = useState([]);
    //Pour mettre à jour l'état local React
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });//Stocker le valeur saisie de champ image dans les variables d'état
    }


    //fonction pour modifier un utlisateur
    const updateUser = (e) => {
        e.preventDefault();//C'est une méthode présente dans l'interface événementielle. Cette méthode empêche le navigateur d'exécuter le comportement par défaut de l'élément sélectionné. Cette méthode ne peut annuler l'événement que si l'événement est annulable.

        const user_id = props.match.params._id//obtenir l'id de l'utilisateur à partir des paramètres d'URL

        // l'objet FormData sera rempli avec les clés/valeurs du formulaire en utilisant les noms de propriétés de chaque élément pour clé et les valeurs soumises. Cela encodera aussi le contenu des fichiers.
        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('role_id', UserInput.role_id);
        formData.append('departement', UserInput.departement);
        formData.append('direction', UserInput.direction);
        formData.append('nom', UserInput.nom);
        formData.append('prenom', UserInput.prenom);
        formData.append('tel', UserInput.tel);
        formData.append('matricule', UserInput.matricule);
        formData.append('loginTOPNET', UserInput.loginTOPNET);
        formData.append('adresse', UserInput.adresse);
        formData.append('email', UserInput.email);
        formData.append('password', UserInput.password);


        //l'API pour modifier un utilisateur
        axios.post(`/api/users/${user_id}`, formData).then(res => {

            if (res.data.status === 200) {//si l'utilisateur est modifié
                swal("", res.data.message, "success");//afficher un message de succès
                history.push('/coordinateur/Users');//rediriger le coordinateur vers la page consultation des utilisateurs
                setError([]);//puisqu'il n'y a pas des erreurs des données saisies, stocker donc une liste vide pour les erreurs dans les variables d'état
            } else if (res.data.status === 422) {//en cas des erreurs des données saisies, stocker une liste des erreurs dans les variables d'état
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {//si l'utilisateur non trouvé
                swal("", res.data.message, "error");//afficher un message d'erreur
                history.push('/coordinateur/Users');//rediriger le coordinateur vers la page de consultation des utilisateurs
            }
        });
    }

    //si la page est en cours de chargement, donc afficher un spinner
    if (loading) {
        <Loading />
    }


    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>Modifier utilisateur</h6>
                        </div>
                        <div className="card-body ">

                            <form className="row" onSubmit={updateUser}  >


                                <div className="col-md-6">
                                    <label className="form-label">Matricule</label>
                                    <input type="text" name="matricule" onChange={handleInput} value={UserInput.matricule} className="form-control" placeholder='Matricule' disabled />
                                    <small className="text-danger">{errorlist.matricule}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Nom</label>
                                    <input type="text" name="nom" onChange={handleInput} value={UserInput.nom} className="form-control" placeholder='Nom' disabled />
                                    <small className="text-danger">{errorlist.nom}</small>
                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">Prénom</label>
                                    <input type="text" name="prenom" onChange={handleInput} value={UserInput.prenom} className="form-control" placeholder='Prénom' disabled />
                                    <small className="text-danger">{errorlist.prenom}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input type="email" name="email" onChange={handleInput} value={UserInput.email} className="form-control" placeholder='Email' disabled />
                                    <small className="text-danger">{errorlist.email}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Mot de passe</label>
                                    <input type="password" name="password" autoComplete="on" onChange={handleInput} value={UserInput.password} className="form-control" placeholder='Mot de passe' disabled />
                                    <small className="text-danger">{errorlist.password}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Adresse</label>
                                    <input type="text" name="adresse" onChange={handleInput} value={UserInput.adresse} className="form-control" placeholder="Adresse" />
                                    <small className="text-danger">{errorlist.adresse}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Login</label>
                                    <input type="text" name="loginTOPNET" onChange={handleInput} value={UserInput.loginTOPNET} className="form-control" placeholder="Login" disabled />
                                    <small className="text-danger">{errorlist.loginTOPNET}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Téléphone</label>
                                    <input type="text" name="tel" onChange={handleInput} value={UserInput.tel} className="form-control" placeholder="Tél" />
                                    <small className="text-danger">{errorlist.tel}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Département</label>
                                    <select name="departement" onChange={handleInput} value={UserInput.departement} className="form-select">
                                        <option>Départements</option>
                                        {//obtenir la liste des départements
                                            depslist.map((dep, index) => {
                                                return (
                                                    <option value={dep.id} key={index}>{dep.nomdep}</option>


                                                )
                                            })
                                        }

                                    </select>
                                    <small className="text-danger">{errorlist.departement}</small>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Direction</label>
                                    <select name="direction" onChange={handleInput} value={UserInput.direction} className="form-select">
                                        <option>Direction</option>
                                        {//obtenir la liste des directions
                                            directionlist.map((direction, index) => {
                                                return (
                                                    <option value={direction.id} key={index}>{direction.nomdirection}</option>


                                                )
                                            })
                                        }

                                    </select>
                                    <small className="text-danger">{errorlist.direction}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Role</label>
                                    <select name="role_id" onChange={handleInput} value={UserInput.role_id} className="form-select">
                                        <option>Rôle</option>
                                        {//obtenir la liste des rôles
                                            roleslist.map((role, index) => {
                                                return (
                                                    <option value={role.id} key={index}>{role.nom}</option>


                                                )
                                            })
                                        }

                                    </select>
                                    <small className="text-danger">{errorlist.role_id}</small>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Image</label>
                                    <input name="image" onChange={handleImage} className="form-control" type="file" id="formFile" />
                                    <small className="text-danger">{errorlist.image}</small>
                                </div>

                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-info">Modifier</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
