import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

export default function Addoffre() {

    // Le hook useHistory() renvoie une instance history , qui contient l'emplacement actuel (URL) du composant que nous pouvons utiliser pour naviguer entre les pages.
    const history = useHistory();

    //varibale d'état pour les erreurs
    const [errorlist, setError] = useState([]);

    //variables d'état pour obtenir les valeurs saisies des champs d'offre
    const [OffreInput, setOffre] = useState({
        sujet: '',
        periode: '',
        technologies: '',
        domaine: '',
        type: '',
        description: '',

    });


    //Puisque la valeur du champ est en permanence pilotée par l’état React.
    //Pour mettre à jour l'état local React
    //pour l'offre
    const handleInput = (e) => {
        e.persist();//cela devrait être appelé pour supprimer l'événement en cours du pool.
        setOffre({ ...OffreInput, [e.target.name]: e.target.value }); //Stocker les valeurs saisies des champs de l'offre dans les variables d'état
    }
    //Varibles d'état pour obtenir l'utilisateur authentifié
    const [user, setUser] = useState([]);

    //On utilise ce Hook -> useEFect() pour indiquer à React que notre composant doit exécuter quelque chose après chaque affichage
    useEffect(() => {
        //l'API de l'utilisateur authentifié actuel
        axios.get('/api/currentuser').then(res => {
            if (res.data.status === 200) {//si l'utilisateur est trouvé

                //stockage de l'utilisateur authentifié actuel dans les variables d'état
                setUser(res.data.currentuser);
                //si l'utilisateur non trouvé 
            } else if (res.data.status === 404) {
                //afficher un message d'erreur
                swal("", res.data.message, "error");
            }
        });
    }, []);


    //fonction pour créer offre
    const submitOffre = (e) => {
        e.preventDefault();//C'est une méthode présente dans l'interface événementielle. Cette méthode empêche le navigateur d'exécuter le comportement par défaut de l'élément sélectionné. Cette méthode ne peut annuler l'événement que si l'événement est annulable.

        // l'objet FormData sera rempli avec les clés/valeurs du formulaire en utilisant les noms de propriétés de chaque élément pour clé et les valeurs soumises. Cela encodera aussi le contenu des fichiers.
        const formData = new FormData();
        formData.append('sujet', OffreInput.sujet);
        formData.append('periode', OffreInput.periode);
        formData.append('technologies', OffreInput.technologies);
        formData.append('domaine', OffreInput.domaine);
        formData.append('type', OffreInput.type);
        formData.append('description', OffreInput.description);



        //l'API pour créer l'offre
        axios.post('/api/offres', formData).then(res => {
            if (res.data.status === 200) {//si la question est créee
                swal("", res.data.message, "success");//afficher un message de succès
                //puisqu'il n'y a pas des erreurs des données saisies, stocker donc une liste vide pour les erreurs dans les variables d'état
                setError([]);
                if (user.role_id === "Encadrant") {
                    history.push('/encadrant/Offres');
                }
                else {
                    history.push('/chefdepartement/Offres');
                }


            } else { //En cas des erreurs des données saisies, stocker une liste des erreurs dans les variables d'état
                setError(res.data.errors);

            }

        })
    }

    return (
        <div> <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>Créer offre</h6>
                    </div>
                    <div className="card-body ">

                        <form className="row" onSubmit={submitOffre} >

                            <div className="col-md-6">
                                <label className="form-label">Sujet</label>
                                <input type="text" name="sujet" onChange={handleInput} value={OffreInput.sujet} className="form-control" placeholder='Sujet' />
                                <small className="text-danger">{errorlist.sujet}</small>

                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Période (En mois)</label>
                                <input type="number" name="periode" onChange={handleInput} value={OffreInput.periode} className="form-control" placeholder='Période (En mois)' />
                                <small className="text-danger">{errorlist.periode}</small>

                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Technologies</label>
                                <input type="text" name="technologies" onChange={handleInput} value={OffreInput.technologies} className="form-control" placeholder='Téchnologies' />
                                <small className="text-danger">{errorlist.technologies}</small>

                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Domaine</label>
                                <select name="domaine" onChange={handleInput} value={OffreInput.domaine} className="form-select">
                                    <option  >Domaine</option>
                                    <option>{user.direction}</option>

                                </select>
                                <small className="text-danger">{errorlist.domaine}</small>

                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Type</label>
                                <select name="type" onChange={handleInput} value={OffreInput.type} className="form-select">
                                    <option >Type</option>
                                    <option>Stage PFE ingénieur</option>
                                    <option>Stage PFE licence</option>
                                    <option>Stage PFE master</option>
                                    <option>Stage Perfectionnement</option>
                                    <option>Stage Initiation</option>
                                </select>
                                <small className="text-danger">{errorlist.type}</small>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Déscription</label>
                                <textarea className="form-control" name="description" onChange={handleInput} value={OffreInput.description} placeholder='Déscription' rows="3"></textarea>
                                <small className="text-danger">{errorlist.description}</small>
                            </div>

                            <div className="col-md-6">
                                <button type="submit" className="btn btn-info">Créer</button>

                            </div>


                        </form>


                    </div>
                </div>
            </div>
        </div></div>
    )
}
