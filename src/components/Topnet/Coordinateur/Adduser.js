import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

//pour créer un utilisateur
export default function Adduser() {


    // Le hook useHistory() renvoie une instance history , qui contient l'emplacement actuel (URL) du composant que nous pouvons utiliser pour naviguer entre les pages.
    const history = useHistory();

    //Le useState() est un Hook qui vous permet d'avoir des variables d'état dans les composants fonctionnels.
    // Le premier élément est l’état initial et le second est une fonction qui est utilisée pour mettre à jour l’état.
    //Variables d'état pour obtenir la liste des rôles
    const [roleslist, setRoleslist] = useState([

    ]);
    //Variables d'état pour obtenir la liste des départements
    const [depslist, setDepslist] = useState([

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


    }, []);


    const loginConcat = "TOPNET\\";

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

    });

    //variables d'état pour obtenir l'image saisie
    const [picture, setPicture] = useState([]);
    //varibale d'état pour les erreurs
    const [errorlist, setError] = useState([]);

    //Puisque la valeur du champ est en permanence pilotée par l’état React.
    //Pour mettre à jour l'état local React
    const handleInput = (e) => {
        e.persist();//cela devrait être appelé pour supprimer l'événement en cours du pool.

        //Stocker les valeurs saisies des champs dans les variables d'état
        setUser({ ...UserInput, [e.target.name]: e.target.value });
    }

    //Pour mettre à jour l'état local React
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });//Stocker le valeur saisie de champ image dans les variables d'état

    }

    //fonction pour créer un utlisateur
    const submitUser = (e) => {
        e.preventDefault();//C'est une méthode présente dans l'interface événementielle. Cette méthode empêche le navigateur d'exécuter le comportement par défaut de l'élément sélectionné. Cette méthode ne peut annuler l'événement que si l'événement est annulable.

        // l'objet FormData sera rempli avec les clés/valeurs du formulaire en utilisant les noms de propriétés de chaque élément pour clé et les valeurs soumises. Cela encodera aussi le contenu des fichiers.
        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('role_id', UserInput.role_id);
        formData.append('departement', UserInput.departement);
        formData.append('nom', UserInput.nom);
        formData.append('prenom', UserInput.prenom);
        formData.append('tel', UserInput.tel);
        formData.append('matricule', UserInput.matricule);
        formData.append('loginTOPNET', loginConcat + UserInput.loginTOPNET);
        formData.append('adresse', UserInput.adresse);
        formData.append('email', UserInput.email);
        formData.append('password', UserInput.password);



        //l'API pour créer un utilisateur
        axios.post('/api/users', formData).then(res => {
            if (res.data.status === 200) {//si l'utilisateur est crée
                swal("", res.data.message, "success");//afficher un message de succès
                history.push('/coordinateur/Users');//rediriger le coordinateur vers la page de consultation des utilisateurs
                //puisqu'il n'y a pas des erreurs des données saisies, stocker donc une liste vide pour les erreurs dans les variables d'état
                setError([]);

            } else if (res.data.status === 422) {//en cas des erreurs des données saisies, stocker une liste des erreurs dans les variables d'état
                setError(res.data.errors);
            }
        })
    }

    return (
        <div>
            <div className="row justify-content-center" >
                <div className="col-8 ">
                    <div className="card mb-4 shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="card-header pb-0">
                            <h6>Créer utilisateur</h6>
                        </div>
                        <div className="card-body ">

                            <form className="row" onSubmit={submitUser} >


                                <div className="col-md-6">
                                    <label className="form-label">Matricule</label>
                                    <input onChange={handleInput} value={UserInput.matricule} type="text" name="matricule" className="form-control" placeholder='Matricule' />
                                    <small className="text-danger">{errorlist.matricule}</small>

                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Nom</label>
                                    <input onChange={handleInput} value={UserInput.nom} type="text" name="nom" className="form-control" placeholder='Nom' />
                                    <small className="text-danger">{errorlist.nom}</small>
                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">Prénom</label>
                                    <input onChange={handleInput} value={UserInput.prenom} type="text" name="prenom" className="form-control" placeholder='Prénom' />
                                    <small className="text-danger">{errorlist.prenom}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Adresse e-mail</label>
                                    <input onChange={handleInput} value={UserInput.email} type="email" name="email" className="form-control" placeholder='Adresse e-mail' />
                                    <small className="text-danger">{errorlist.email}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Mot de passe</label>
                                    <input onChange={handleInput} value={UserInput.password} type="password" name="password" autoComplete="on" className="form-control" placeholder='Mot de passe' />
                                    <small className="text-danger">{errorlist.password}</small>
                                </div>

                                <div className="col-md-6" style={{ marginTop: '30px' }}>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="topnet">TOPNET\</span>
                                        <input onChange={handleInput} value={UserInput.loginTOPNET} name="loginTOPNET" type="text" className="form-control" placeholder="Login" a-label="Email" aria-describedby="topnet" />
                                        <span className="text-danger">{errorlist.loginTOPNET}</span>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Adresse</label>
                                    <input onChange={handleInput} value={UserInput.adresse} type="text" name="adresse" className="form-control" placeholder="Adresse" />
                                    <small className="text-danger">{errorlist.adresse}</small>
                                </div>



                                <div className="col-md-6">
                                    <label className="form-label">Téléphone</label>
                                    <input onChange={handleInput} value={UserInput.tel} type="text" name="tel" className="form-control" placeholder="Téléphone" />
                                    <small className="text-danger">{errorlist.tel}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Départements</label>
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
                                    <label className="form-label">Rôle</label>
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
                                    <input onChange={handleImage} name="image" className="form-control" type="file" id="formFile" />
                                    <small className="text-danger">{errorlist.image}</small>
                                </div>

                                <div className="col-md-6 mt-4">
                                    <button type="submit" className="btn btn-primary">Créer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
