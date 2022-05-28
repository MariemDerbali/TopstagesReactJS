import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Loading from '../../../../layouts/Topnet/Loading';
import Footer from '../../../../layouts/Topnet/Footer';



export default function Editoffre(props) {

    //Le useState() est un Hook qui vous permet d'avoir des variables d'état dans les composants fonctionnels.
    // Le premier élément est l’état initial et le second est une fonction qui est utilisée pour mettre à jour l’état.
    //varibale d'état pour les erreurs des données saisies
    const [errorlist, setError] = useState([]);

    //Variables d'état pour afficher le spinner qui indique le chargement de la page
    const [loading, setLoading] = useState(true);

    // Le hook useHistory() renvoie une instance history , qui contient l'emplacement actuel (URL) du composant que nous pouvons utiliser pour naviguer entre les pages.
    const history = useHistory();

    const [checkbox, setCheckbox] = useState([]);
    const handleCheckbox = (e) => {
        e.persist();//cela devrait être appelé pour supprimer l'événement en cours du pool.

        //Stocker le valeur de la case à cocher dans les variables d'état
        setCheckbox({ ...checkbox, [e.target.name]: e.target.checked });
    }

    const [checkbox2, setCheckbox2] = useState([]);
    const handleCheckbox2 = (e) => {
        e.persist();//cela devrait être appelé pour supprimer l'événement en cours du pool.

        //Stocker le valeur de la case à cocher dans les variables d'état
        setCheckbox2({ ...checkbox2, [e.target.name]: e.target.checked });
    }


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
    const handleInput = (e) => {
        e.persist();//cela devrait être appelé pour supprimer l'événement en cours du pool.
        setOffre({ ...OffreInput, [e.target.name]: e.target.value });//Stocker les valeurs saisies des champs dans les variables d'état

    }

    const offre_id = props.match.params._id//obtenir l'id de l'offre à partir des paramètres d'URL
    useEffect(() => {
        //l'API pour obtenir une offre
        axios.get(`/api/edit-offre/${offre_id}`).then(res => {
            if (res.data.status === 200) {//si l'offre est trouvée
                //stockage de l'offre  dans les variables d'état

                setOffre(res.data.offre);

            } else if (res.data.status === 404) {//si l'offre est non trouvée
                swal("", res.data.message, "error");//afficher un message d'erreur
                history.goBack();
            }
            //arrêter le chargement de la page
            setLoading(false);
        });

    }, [props.match.params._id, history]);


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



    //fonction pour modifier une offre
    const updateOffre = (e) => {
        e.preventDefault();//C'est une méthode présente dans l'interface événementielle. Cette méthode empêche le navigateur d'exécuter le comportement par défaut de l'élément sélectionné. Cette méthode ne peut annuler l'événement que si l'événement est annulable.

        const offre_id = props.match.params._id//obtenir l'id de l'offre à partir des paramètres d'URL

        // l'objet FormData sera rempli avec les clés/valeurs du formulaire en utilisant les noms de propriétés de chaque élément pour clé et les valeurs soumises. Cela encodera aussi le contenu des fichiers.
        const formData = new FormData();
        formData.append('sujet', OffreInput.sujet);
        formData.append('periode', OffreInput.periode);
        formData.append('technologies', OffreInput.technologies);
        formData.append('domaine', OffreInput.domaine);
        formData.append('type', OffreInput.type);
        formData.append('description', OffreInput.description);
        formData.append('etatoffre', checkbox.etatoffre ? 'inactive' : 'active');//pour désactiver ou activer une offre
        formData.append('etatpartage', checkbox2.etatpartage ? 'published' : 'unpublished');//pour publier ou dépublier une offre


        //l'API pour modifier une offre
        axios.post(`/api/offres/${offre_id}`, formData).then(res => {

            if (res.data.status === 200) {//si l'offre est modifiée
                swal("", res.data.message, "success");//afficher un message de succès
                history.goBack();//rediriger l'encadrant vers la page consultation des offres
                setError([]);//puisqu'il n'y a pas des erreurs des données saisies, stocker donc une liste vide pour les erreurs dans les variables d'état
            } else if (res.data.status === 422) {//en cas des erreurs des données saisies, stocker une liste des erreurs dans les variables d'état
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {//si l'offre non trouvée
                swal("", res.data.message, "error");//afficher un message d'erreur
                history.goBack();//rediriger l'encadrant vers la page de consultation des offres
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
                            <h6>Modifier offre</h6>
                        </div>
                        <div className="card-body ">

                            <form className="row" onSubmit={updateOffre} >

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
                                    <select name="domaine" onChange={handleInput} value={OffreInput.domaine} className="form-select" disabled>
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


                                <div className="col-md-6 mt-3">
                                    <button type="submit" className="btn btn-info">Modifier</button>

                                </div>


                            </form>


                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
