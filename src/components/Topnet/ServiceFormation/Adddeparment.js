import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

//pour créer une département
export default function Adddeparment() {

    // Le hook useHistory() renvoie une instance history , qui contient l'emplacement actuel (URL) du composant que nous pouvons utiliser pour naviguer entre les pages.
    const history = useHistory();


    //Le useState() est un Hook qui vous permet d'avoir des variables d'état dans les composants fonctionnels.
    // Le premier élément est l’état initial et le second est une fonction qui est utilisée pour mettre à jour l’état.

    //varibale d'état pour les erreurs des données saisies
    const [errorlist, setError] = useState([]);

    //variables d'état pour obtenir les valeurs saisies des champs
    const [DepInput, setDepartment] = useState({
        nomdep: '',
        nomdirection: '',
        chefdep: '',
    });


    //Puisque la valeur du champ est en permanence pilotée par l’état React.
    //Pour mettre à jour l'état local React
    const handleInput = (e) => {
        e.persist();//cela devrait être appelé pour supprimer l'événement en cours du pool.
        setDepartment({ ...DepInput, [e.target.name]: e.target.value });//Stocker les valeurs saisies des champs dans les variables d'état
    }


    //fonction pour créer un département
    const submitDepartment = (e) => {
        e.preventDefault();//C'est une méthode présente dans l'interface événementielle. Cette méthode empêche le navigateur d'exécuter le comportement par défaut de l'élément sélectionné. Cette méthode ne peut annuler l'événement que si l'événement est annulable.

        // l'objet FormData sera rempli avec les clés/valeurs du formulaire en utilisant les noms de propriétés de chaque élément pour clé et les valeurs soumises. Cela encodera aussi le contenu des fichiers.
        const formData = new FormData();
        formData.append('nomdep', DepInput.nomdep);
        formData.append('nomdirection', DepInput.nomdirection);
        formData.append('chefdep', DepInput.chefdep);


        //l'API pour créer un département
        axios.post('/api/departments', formData).then(res => {
            if (res.data.status === 200) {//si le département est crée
                swal("", res.data.message, "success");//afficher un message de succès
                history.push('/serviceformation/Departments'); //rediriger le service formation vers la page de consultation des départements
                setError([]);//puisqu'il n'y a pas des erreurs des données saisies, stocker donc une liste vide pour les erreurs dans les variables d'état

            } else if (res.data.status === 422) {//en cas des erreurs des données saisies, stocker une liste des erreurs dans les variables d'état
                setError(res.data.errors);
            }
        })
    }



    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-8">
                    <div className="card mb-12">
                        <div className="card-header pb-0">
                            <h6>Créer département</h6>
                        </div>
                        <div className="card-body ">

                            <form className="row" onSubmit={submitDepartment} >


                                <div className="col-md-6">
                                    <label className="form-label">Nom</label>
                                    <input onChange={handleInput} value={DepInput.nomdep} type="text" name="nomdep" className="form-control" placeholder='Nom' />
                                    <small className="text-danger">{errorlist.nomdep}</small>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Direction</label>
                                    <input onChange={handleInput} value={DepInput.nomdirection} type="text" name="nomdirection" className="form-control" placeholder='Direction' />
                                    <small className="text-danger">{errorlist.nomdirection}</small>
                                </div>



                                <div className="col-md-6">
                                    <label className="form-label">Chef département</label>
                                    <input onChange={handleInput} value={DepInput.chefdep} type="text" name="chefdep" className="form-control" placeholder='Chef département' />
                                    <small className="text-danger">{errorlist.chefdep}</small>
                                </div>



                                <div className="col-12 mt-4">
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
