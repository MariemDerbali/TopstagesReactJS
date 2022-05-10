import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';


export default function Addcritere() {

    const history = useHistory();

    const [errorlist, setError] = useState([]);

    const [CritereInput, setCritere] = useState({
        domainestage: '',
        typestage: '',
        nombrequestionsfaciles: '',
        nombrequestionsmoyennes: '',
        nombrequestionsdifficiles: '',
        notequestionfacile: '',
        notequestionmoyenne: '',
        notequestiondifficile: '',

    });



    const handleInput = (e) => {
        e.persist();
        setCritere({ ...CritereInput, [e.target.name]: e.target.value });
    }
    const [directionslist, setDirections] = useState([]);

    useEffect(() => {
        axios.get('/api/directions').then(res => {
            if (res.data.status === 200) {
                setDirections(res.data.directions);
            }
        });
    }, []);


    //fonction pour créer offre
    const submitCritere = (e) => {
        e.preventDefault();//C'est une méthode présente dans l'interface événementielle. Cette méthode empêche le navigateur d'exécuter le comportement par défaut de l'élément sélectionné. Cette méthode ne peut annuler l'événement que si l'événement est annulable.

        // l'objet FormData sera rempli avec les clés/valeurs du formulaire en utilisant les noms de propriétés de chaque élément pour clé et les valeurs soumises. Cela encodera aussi le contenu des fichiers.
        const formData = new FormData();
        formData.append('domainestage', CritereInput.domainestage);
        formData.append('typestage', CritereInput.typestage);
        formData.append('nombrequestionsfaciles', CritereInput.nombrequestionsfaciles);
        formData.append('nombrequestionsmoyennes', CritereInput.nombrequestionsmoyennes);
        formData.append('nombrequestionsdifficiles', CritereInput.nombrequestionsdifficiles);
        formData.append('notequestionfacile', CritereInput.notequestionfacile);
        formData.append('notequestionmoyenne', CritereInput.notequestionmoyenne);
        formData.append('notequestiondifficile', CritereInput.notequestiondifficile);

        axios.post('/api/criteres', formData).then(res => {
            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                setError([]);
                history.push('/serviceformation/Criteres');

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
                        <h6>Créer critère</h6>
                    </div>
                    <div className="card-body ">

                        <form className="row" onSubmit={submitCritere} >

                            <div className="col-md-6">
                                <label className="form-label">Domaine de stage</label>
                                <select name="domainestage" onChange={handleInput} value={CritereInput.domainestage} className="form-select">
                                    <option>Domaine</option>
                                    {//obtenir la liste des départements
                                        directionslist.map((dep, index) => {
                                            return (
                                                <option value={dep.id} key={index}>{dep.nomdirection}</option>


                                            )
                                        })
                                    }

                                </select>

                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Type de stage</label>
                                <select name="typestage" onChange={handleInput} value={CritereInput.typestage} className="form-select">
                                    <option >Type</option>
                                    <option>Stage PFE ingénieur</option>
                                    <option>Stage PFE licence</option>
                                    <option>Stage PFE master</option>
                                    <option>Stage Perfectionnement</option>
                                    <option>Stage Initiation</option>
                                </select>
                                <small className="text-danger">{errorlist.typestage}</small>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Nombre questions faciles</label>
                                <input type="number" name="nombrequestionsfaciles" onChange={handleInput} value={CritereInput.nombrequestionsfaciles} className="form-control" placeholder='Nombre questions faciles' />
                                <small className="text-danger">{errorlist.nombrequestionsfaciles}</small>

                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Note question facile</label>
                                <input type="number" name="notequestionfacile" onChange={handleInput} value={CritereInput.notequestionfacile} className="form-control" placeholder='Note question facile' />
                                <small className="text-danger">{errorlist.notequestionfacile}</small>

                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Nombre questions moyennes</label>
                                <input type="number" name="nombrequestionsmoyennes" onChange={handleInput} value={CritereInput.nombrequestionsmoyennes} className="form-control" placeholder='Nombre questions moyennes' />
                                <small className="text-danger">{errorlist.nombrequestionsmoyennes}</small>

                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Note question moyenne</label>
                                <input type="number" name="notequestionmoyenne" onChange={handleInput} value={CritereInput.notequestionmoyenne} className="form-control" placeholder='Note question moyenne' />
                                <small className="text-danger">{errorlist.notequestionmoyenne}</small>

                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Nombre questions difficiles</label>
                                <input type="number" name="nombrequestionsdifficiles" onChange={handleInput} value={CritereInput.nombrequestionsdifficiles} className="form-control" placeholder='Nombre questions difficiles' />
                                <small className="text-danger">{errorlist.nombrequestionsdifficiles}</small>

                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Note question difficile</label>
                                <input type="number" name="notequestiondifficile" onChange={handleInput} value={CritereInput.notequestiondifficile} className="form-control" placeholder='Note question difficile' />
                                <small className="text-danger">{errorlist.notequestiondifficile}</small>

                            </div>






                            <div className="col-md-6 mt-3">
                                <button type="submit" className="btn btn-info">Créer</button>

                            </div>


                        </form>


                    </div>
                </div>
            </div>
        </div></div>
    )
}
