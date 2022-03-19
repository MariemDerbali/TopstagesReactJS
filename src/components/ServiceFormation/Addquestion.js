import axios from 'axios'
import React, { useState } from 'react'
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from "../coordinateur/MaterialTableIcons";

//pour créer une question
export default function Addquestion() {

    // Le hook useHistory() renvoie une instance history , qui contient l'emplacement actuel (URL) du composant que nous pouvons utiliser pour naviguer entre les pages.
    const history = useHistory();

    //pour afficher les champs de question
    function textimageCheck() {

        //si la question s'agit de text seulement
        if (document.getElementById('text').checked) {

            //afficher la zone de texte
            document.getElementById('ifText').style.display = "block";
            //indication que le champ de texte est requis
            document.getElementById('inputtext').required = true
            //masquer la zone d'image
            document.getElementById('ifImage').style.display = "none";
            //masquer la zone de text et image(le DIV pour la question qui s'agit de text et image)
            document.getElementById('ifTextImage').style.display = "none";
        }
        //si la question s'agit d'image seulement
        else if (document.getElementById('image').checked) {
            //afficher la zone d'image
            document.getElementById('ifImage').style.display = "block";
            //indication que le champ d'image est requis
            document.getElementById('inputimage').required = true
            //masquer la zone de texte
            document.getElementById('ifText').style.display = "none";
            //masquer la zone de text et image(le DIV pour la question qui s'agit de text et image)
            document.getElementById('ifTextImage').style.display = "none";
        }
        //si la question s'agit de texte et image
        else if (document.getElementById('textimage').checked) {
            //afficher la zone de texte et image
            document.getElementById('ifTextImage').style.display = "block";
            //indication que le champ de texte est requis
            document.getElementById('inputtextimage1').required = true
            //indication que le champ d'image est requis
            document.getElementById('inputtextimage2').required = true

            //masquer la zone de texte(le DIV pour la question qui s'agit de texte seulement)
            document.getElementById('ifText').style.display = "none";
            //masquer la zone d'image(le DIV pour la question qui s'agit d'image seulement)
            document.getElementById('ifImage').style.display = "none";

        }
        else {//si le service formation n'a pas encore précisé le type de question, alors masquer toutes les zones de saisie
            document.getElementById('ifTextImage').style.display = "none";
            document.getElementById('ifText').style.display = "none";
            document.getElementById('ifImage').style.display = "none";

        }

    }

    //pour afficher les champs de réponse
    function ReptextimageCheck() {
        //si la réponse s'agit de text seulement
        if (document.getElementById('Reptext').checked) {

            //afficher la zone de texte
            document.getElementById('ifRepText').style.display = "block";
            //indication que le champ de texte est requis
            document.getElementById('inputReptext').required = true
            //masquer la zone d'image
            document.getElementById('ifRepImage').style.display = "none";
            //masquer la zone de text et image(le DIV pour la réponse qui s'agit de text et image)
            document.getElementById('ifRepTextImage').style.display = "none";
        }
        //si la réponse s'agit d'image seulement
        else if (document.getElementById('Repimage').checked) {
            //afficher la zone d'image
            document.getElementById('ifRepImage').style.display = "block";
            //indication que le champ d'image est requis
            document.getElementById('inputRepimage').required = true
            //masquer la zone de texte
            document.getElementById('ifRepText').style.display = "none";
            //masquer la zone de text et image(le DIV pour la réponse qui s'agit de text et image)
            document.getElementById('ifRepTextImage').style.display = "none";
        }//si la réponse s'agit de texte et image
        else if (document.getElementById('Reptextimage').checked) {
            //afficher la zone de texte et image
            document.getElementById('ifRepTextImage').style.display = "block";
            //indication que le champ de texte est requis
            document.getElementById('inputReptextimage1').required = true
            //indication que le champ d'image est requis
            document.getElementById('inputReptextimage2').required = true
            //masquer la zone de texte(le DIV pour la réponse qui s'agit de texte seulement)
            document.getElementById('ifRepText').style.display = "none";
            //masquer la zone d'image (le DIV pour la question qui s'agit d'image seulement)
            document.getElementById('ifRepImage').style.display = "none";

        }
        else {//si le service formation n'a pas encore précisé le type de réponse, alors masquer toutes les zones de saisie
            document.getElementById('ifTextImage').style.display = "none";
            document.getElementById('ifText').style.display = "none";
            document.getElementById('ifImage').style.display = "none";

        }

    }


    //Le useState() est un Hook qui vous permet d'avoir des variables d'état dans les composants fonctionnels.
    // Le premier élément est l’état initial et le second est une fonction qui est utilisée pour mettre à jour l’état.

    //variables d'état pour obtenir les valeurs saisies des champs de question
    const [QuestionInput, setQuestion] = useState({
        questionText: '',
        niveau: '',
        duree: '',


    });

    //variables d'état pour obtenir l'id de question
    const [questionid, setQuestionID] = useState([]);

    //variables d'état pour obtenir les valeurs saisies des champs de réponses
    const [ReponseInput, setReponse] = useState({
        reponseText: '',
        reponseCorrecte: '',
        questionid,

    });

    //Variables d'état pour obtenir la liste des réponses
    const [reponse, setReponseList] = useState([]);

    //variables d'état pour obtenir l'image saisie de question
    const [picture, setPicture] = useState([]);

    //variables d'état pour obtenir l'image saisie de réponse
    const [picturerep, setPicturerep] = useState([]);

    //varibale d'état pour les erreurs
    const [errorlist, setError] = useState([]);


    //Puisque la valeur du champ est en permanence pilotée par l’état React.
    //Pour mettre à jour l'état local React
    //pour la question
    const handleInput = (e) => {
        e.persist();//cela devrait être appelé pour supprimer l'événement en cours du pool.
        setQuestion({ ...QuestionInput, [e.target.name]: e.target.value }); //Stocker les valeurs saisies des champs de la question dans les variables d'état
    }
    //pour la question
    const handleImage = (e) => {
        setPicture({ questionImage: e.target.files[0] });//Stocker le valeur saisie de champ image de la question dans les variables d'état
    }

    //Pour mettre à jour l'état local React
    //pour la réponse
    const handleInputrep = (e) => {
        e.persist();//cela devrait être appelé pour supprimer l'événement en cours du pool.
        setReponse({ ...ReponseInput, [e.target.name]: e.target.value }); //Stocker les valeurs saisies des champs de la réponse dans les variables d'état
    }

    //pour la réponse
    const handleImagerep = (e) => {
        setPicturerep({ reponseImage: e.target.files[0] });//Stocker le valeur saisie de champ image de la réponse dans les variables d'état
    }

    //fonction pour créer une réponse
    const submitReponse = (e) => {
        e.preventDefault();//C'est une méthode présente dans l'interface événementielle. Cette méthode empêche le navigateur d'exécuter le comportement par défaut de l'élément sélectionné. Cette méthode ne peut annuler l'événement que si l'événement est annulable.

        // l'objet FormData sera rempli avec les clés/valeurs du formulaire en utilisant les noms de propriétés de chaque élément pour clé et les valeurs soumises. Cela encodera aussi le contenu des fichiers.
        const formData = new FormData();
        formData.append('reponseImage', picturerep.reponseImage);
        formData.append('reponseText', ReponseInput.reponseText);
        formData.append('reponseCorrecte', ReponseInput.reponseCorrecte);

        formData.append('questionID', questionid);//obtenir l'id de la question actuelle

        //l'API pour créer une réponse
        axios.post('/api/reponses', formData).then(res => {
            if (res.data.status === 200) {//si la réponse est créee
                swal("", res.data.message, "success");//afficher un message de succès
                setReponseList(reponse => [...reponse, res.data.reponse]);//stockage la liste des réponses dans les variables détat
                //puisqu'il n'y a pas des erreurs des données saisies, stocker donc une liste vide pour les erreurs dans les variables d'état
                setError([]);

            } else if (res.data.status === 422) {//en cas des erreurs des données saisies, stocker une liste des erreurs dans les variables d'état
                setError(res.data.errors);

            } else if (res.data.status === 423) {//afficher un message d'erreur si le service formation crée une réponse avant de créer une question
                swal("", res.data.message, "warning");

            } else if (res.data.status === 505) {//afficher un message d'erreur si le service formation n'a pas précisé le type de réponse
                swal("", res.data.message, "warning");
            }

        })


    }

    //fonction pour créer une question
    const submitQuestion = (e) => {
        e.preventDefault();//C'est une méthode présente dans l'interface événementielle. Cette méthode empêche le navigateur d'exécuter le comportement par défaut de l'élément sélectionné. Cette méthode ne peut annuler l'événement que si l'événement est annulable.

        // l'objet FormData sera rempli avec les clés/valeurs du formulaire en utilisant les noms de propriétés de chaque élément pour clé et les valeurs soumises. Cela encodera aussi le contenu des fichiers.
        const formData = new FormData();
        formData.append('questionImage', picture.questionImage);
        formData.append('questionText', QuestionInput.questionText);
        formData.append('niveau', QuestionInput.niveau);
        formData.append('duree', QuestionInput.duree);


        //l'API pour créer une question
        axios.post('/api/questions', formData).then(res => {
            if (res.data.status === 200) {//si la question est créee
                swal("", res.data.message, "success");//afficher un message de succès
                setQuestionID(res.data.questionId);//stockage des questions dans les variables détat
                //puisqu'il n'y a pas des erreurs des données saisies, stocker donc une liste vide pour les erreurs dans les variables d'état
                setError([]);

            } else if (res.data.status === 422) {//en cas des erreurs des données saisies, stocker une liste des erreurs dans les variables d'état
                setError(res.data.errors);

            } else if (res.data.status === 505) {//afficher un message d'erreur si le service formation n'a pas précisé le type de question
                swal("", res.data.message, "warning");
            }

        })
    }



    return (

        <div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>Créer question</h6>
                        </div>
                        <div className="card-body ">

                            <form className="row" onSubmit={submitQuestion}  >


                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor=""><strong>Type de question</strong></label><br />
                                        <input type="radio" name="radio" value="text" id="text" onClick={textimageCheck} />&nbsp;<label htmlFor="">Text</label> &nbsp;&nbsp;&nbsp;
                                        <input type="radio" name="radio" value="image" id="image" onClick={textimageCheck} />&nbsp;<label htmlFor="">Image</label> &nbsp;&nbsp;&nbsp;

                                        <input type="radio" name="radio" value="textimage" id="textimage" onClick={textimageCheck}
                                        />&nbsp;<label htmlFor="">Text et image</label>

                                    </div>
                                </div>
                                <span id="ifText" style={{ display: "none" }} >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label">Question text</label>
                                            <input id='inputtext' onChange={handleInput} value={QuestionInput.questionText} type="text" name="questionText" className="form-control" placeholder='Question' />
                                            <small className="text-danger">{errorlist.questionText}</small>

                                        </div>
                                    </div>
                                </span>

                                <span id="ifImage" style={{ display: "none" }}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Question image</label>
                                            <input id='inputimage' onChange={handleImage} name="questionImage" className="form-control" type="file" />
                                            <small className="text-danger">{errorlist.questionImage}</small>
                                        </div>
                                    </div>
                                </span>


                                <span id="ifTextImage" style={{ display: "none" }}  >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label">Question text</label>
                                            <input id='inputtextimage1' onChange={handleInput} value={QuestionInput.questionText} type="text" name="questionText" className="form-control" placeholder='Question' />
                                            <small className="text-danger">{errorlist.questionText}</small>

                                        </div>


                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Question image</label>
                                            <input id='inputtextimage2' onChange={handleImage} name="questionImage" className="form-control" type="file" />
                                            <small className="text-danger">{errorlist.questionImage}</small>

                                        </div>
                                    </div>
                                </span>

                                <div className="col-md-6">
                                    <label className="form-label">Durée de la question (s)</label>
                                    <input onChange={handleInput} value={QuestionInput.duree} type="text" name="duree" className="form-control" placeholder='Durée question (s)' />
                                    <small className="text-danger">{errorlist.duree}</small>

                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">Niveau de difficulté</label>
                                    <select onChange={handleInput} value={QuestionInput.niveau} name="niveau" className="form-select">
                                        <option  >Niveau de difficulté</option>
                                        <option>Facile</option>
                                        <option>Moyenne</option>
                                        <option>difficile</option>
                                    </select>
                                    <small className="text-danger">{errorlist.niveau}</small>
                                </div>
                                <div className="col-md-6 mt-4">
                                    <button type="submit" className="btn btn-primary">Créer question</button>
                                    &nbsp; <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Créer réponses
                                    </button>
                                </div>


                            </form>


                            <form onSubmit={submitReponse}>

                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Créer réponse</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="col-md-12 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor=""><strong>Type de réponse</strong></label><br />
                                                        <input type="radio" name="radio" value="Reptext" id="Reptext" onClick={ReptextimageCheck} />&nbsp;<label htmlFor="">Text</label> &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="radio" value="Repimage" id="Repimage" onClick={ReptextimageCheck} />&nbsp;<label htmlFor="">Image</label> &nbsp;&nbsp;&nbsp;

                                                        <input type="radio" name="radio" value="Reptextimage" id="Reptextimage" onClick={ReptextimageCheck}
                                                        />&nbsp;<label htmlFor="">Text et image</label>

                                                    </div>
                                                </div>
                                                <span id="ifRepText" style={{ display: "none" }} >
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <label className="form-label">Réponse text</label>
                                                            <input id='inputReptext' onChange={handleInputrep} value={ReponseInput.reponseText} type="text" name="reponseText" className="form-control" placeholder='Réponse' />
                                                            <small className="text-danger">{errorlist.reponseText}</small>

                                                        </div>
                                                    </div>
                                                </span>

                                                <span id="ifRepImage" style={{ display: "none" }}>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Réponse image</label>
                                                            <input id='inputRepimage' onChange={handleImagerep} name="reponseImage" className="form-control" type="file" />
                                                            <small className="text-danger">{errorlist.reponseImage}</small>
                                                        </div>
                                                    </div>
                                                </span>


                                                <span id="ifRepTextImage" style={{ display: "none" }}  >
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <label className="form-label">Réponse text</label>
                                                            <input id='inputReptextimage1' onChange={handleInputrep} value={ReponseInput.reponseText} type="text" name="reponseText" className="form-control" placeholder='Réponse' />
                                                            <small className="text-danger">{errorlist.reponseText}</small>

                                                        </div>


                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Réponse image</label>
                                                            <input id='inputReptextimage2' onChange={handleImagerep} name="reponseImage" className="form-control" type="file" />
                                                            <small className="text-danger">{errorlist.reponseImage}</small>

                                                        </div>
                                                    </div>
                                                </span>


                                                <div className="col-md-6">
                                                    <label className="form-label">Réponse correcte?</label>
                                                    <select onChange={handleInputrep} value={ReponseInput.reponseCorrecte} name="reponseCorrecte" className="form-select">
                                                        <option >Réponse correcte?</option>
                                                        <option>Oui</option>
                                                        <option>Non</option>
                                                    </select>
                                                    <small className="text-danger">{errorlist.reponseCorrecte}</small>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                                <button type="submit" className="btn btn-primary">Créer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className='col-12'>
                    <div className="col-12">
                        <MaterialTable
                            columns={[
                                {
                                    title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Réponse image</h1> //Cellule d'en-tête <th>
                                    , render: reponse => {
                                        return (//Cellule de données <td>
                                            <div className="d-flex px-2 py-1">


                                                <div>
                                                    {/*si la réponse s'agit d'image */}
                                                    {reponse.reponseImage ?
                                                        //donc afficher l'image
                                                        <img src={`http://127.0.0.1:8000/${reponse.reponseImage}`} className="avatar avatar-sm me-3" alt="user1" />
                                                        //sinon afficher sans image
                                                        : <span className="badge rounded-pill bg-light text-dark">Sans image</span>}
                                                </div>

                                            </div>)
                                    }


                                },


                                {
                                    title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Réponse text</h1>//Cellule d'en-tête <th>
                                    , render: (reponse) => {
                                        return (
                                            <div>
                                                {/*si la réponse s'agit de texte */}
                                                {reponse.reponseText ?
                                                    //donc afficher le texte
                                                    <p className="text-xs font-weight-bold mb-0">{reponse.reponseText}</p>
                                                    //sinon afficher sans texte
                                                    : <span className="badge rounded-pill bg-light text-dark">Sans texte</span>}
                                            </div>

                                        )
                                    }
                                    ,

                                    //pour personnaliser le filtre et la recherche
                                    customFilterAndSearch: (term, reponse) => ((reponse.reponseText).toLowerCase()).indexOf(term.toLowerCase()) != -1 //filtrer et rechercher texte de réponse


                                },

                                {
                                    title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Réponse correcte?</h1> //Cellule d'en-tête <th>
                                    , render: reponse => {
                                        return (
                                            //Cellule de données <td>
                                            <span className="text-xs text-secondary mb-0">{reponse.reponseCorrecte}</span>

                                        )
                                    },
                                    //pour personnaliser le filtre et la recherche
                                    customFilterAndSearch: (term, reponse) => ((reponse.reponseCorrecte).toLowerCase()).indexOf(term.toLowerCase()) != -1 //filtrer et rechercher par la nature de réponse

                                },



                            ]

                            }
                            data={reponse}//la liste des utilisateurs
                            title={<h6>Liste réponses</h6>}//titre de tableau
                            icons={tableIcons}//icônes de tableau

                        />
                    </div>

                </div>
            </div>

        </div>


    )


}
