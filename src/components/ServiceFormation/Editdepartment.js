import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Loading from '../../layouts/Loading';

//pour modifier un département
export default function Editdepartment(props) {

    //Le useState() est un Hook qui vous permet d'avoir des variables d'état dans les composants fonctionnels.
    // Le premier élément est l’état initial et le second est une fonction qui est utilisée pour mettre à jour l’état.

    //varibale d'état pour les erreurs des données saisies
    const [errorlist, setError] = useState([]);


    //Variables d'état pour afficher le spinner qui indique le chargement de la page
    const [loading, setLoading] = useState(true);

    // Le hook useHistory() renvoie une instance history , qui contient l'emplacement actuel (URL) du composant que nous pouvons utiliser pour naviguer entre les pages.
    const history = useHistory();



    //Puisque la valeur du champ est en permanence pilotée par l’état React.
    //Pour mettre à jour l'état local React
    //variable d'état pour la case à cocher
    const [checkbox, setCheckbox] = useState([]);
    const handleCheckbox = (e) => {
        e.persist();//cela devrait être appelé pour supprimer l'événement en cours du pool.

        //Stocker le valeur de la case à cocher dans les variables d'état
        setCheckbox({ ...checkbox, [e.target.name]: e.target.checked });
    }

    //On utilise ce Hook -> useEFect() pour indiquer à React que notre composant doit exécuter quelque chose après chaque affichage
    useEffect(() => {


        const dep_id = props.match.params._id//obtenir l'id de département à partir des paramètres d'URL
        //l'API pour afficher le département
        axios.get(`/api/edit-department/${dep_id}`).then(res => {
            if (res.data.status === 200) {//si le département est trouvé
                //stockage de département dans les variables d'état
                setDepartment(res.data.dep);

            } else if (res.data.status === 404) {//si le département est non trouvé
                swal("", res.data.message, "error");//afficher un message d'erreur
                history.push('/serviceformation/Departments');//rediriger le service formation vers la page de consultation des départements
            }
            setLoading(false);//arrêter le chargement de la page
        });

    }, [props.match.params._id, history]);

    //variables d'état pour obtenir les valeurs saisies des champs
    const [DepInput, setDepartment] = useState({
        nomdep: '',
        chefdep: '',

    });


    //Puisque la valeur du champ est en permanence pilotée par l’état React.
    //Pour mettre à jour l'état local React
    const handleInput = (e) => {
        e.persist();//cela devrait être appelé pour supprimer l'événement en cours du pool.
        setDepartment({ ...DepInput, [e.target.name]: e.target.value });//Stocker les valeurs saisies des champs dans les variables d'état
    }



    //fonction pour modifier un département
    const updateDepartment = (e) => {
        e.preventDefault();//C'est une méthode présente dans l'interface événementielle. Cette méthode empêche le navigateur d'exécuter le comportement par défaut de l'élément sélectionné. Cette méthode ne peut annuler l'événement que si l'événement est annulable.

        const dep_id = props.match.params._id//obtenir l'id de département à partir des paramètres d'URL

        // l'objet FormData sera rempli avec les clés/valeurs du formulaire en utilisant les noms de propriétés de chaque élément pour clé et les valeurs soumises. Cela encodera aussi le contenu des fichiers.
        const formData = new FormData();
        formData.append('nomdep', DepInput.nomdep);
        formData.append('chefdep', DepInput.chefdep);
        formData.append('etat', checkbox.etat ? 'inactive' : 'active');//pour désactiver ou activer un département



        //l'API pour modifier le département
        axios.post(`/api/departments/${dep_id}`, formData).then(res => {

            if (res.data.status === 200) {//si le département est modifié
                swal("", res.data.message, "success");//afficher un message de succès
                history.push('/serviceformation/Departments');//rediriger le service formation vers la page consultation des départements
                setError([]);//puisqu'il n'y a pas des erreurs des données saisies, stocker donc une liste vide pour les erreurs dans les variables d'état
            } else if (res.data.status === 422) {//en cas des erreurs des données saisies, stocker une liste des erreurs dans les variables d'état
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {//si le département non trouvé
                swal("", res.data.message, "error");//afficher un message d'erreur
                history.push('/serviceformation/Departments');//rediriger le service formation vers la page consultation des départements
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

                            <form className="row" onSubmit={updateDepartment}  >


                                <div className="col-md-6">
                                    <label className="form-label">Nom département</label>
                                    <input type="text" name="nomdep" onChange={handleInput} value={DepInput.nomdep} className="form-control" placeholder='Nom département' disabled />
                                    <small className="text-danger">{errorlist.nomdep}</small>
                                </div>



                                <div className="col-md-6">
                                    <label className="form-label">Chef département</label>
                                    <input type="text" name="chefdep" onChange={handleInput} value={DepInput.chefdep} className="form-control" placeholder="Chef département" />
                                    <small className="text-danger">{errorlist.chefdep}</small>
                                </div>



                                <div className="col-md-6 mt-3">
                                    <div className='form-check'>
                                        <input name="etat" onChange={handleCheckbox} defaultChecked={checkbox.etat === 'inactive' ? true : false} className="form-check-input" id="flexCheckChecked" type="checkbox" />
                                        <label className="form-check-label" >
                                            Cochez pour désactiver le département
                                        </label>
                                    </div>
                                </div>

                                <div className="col-md-6 mt-3">
                                    <button type="submit" className="btn btn-primary">Modifier</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
