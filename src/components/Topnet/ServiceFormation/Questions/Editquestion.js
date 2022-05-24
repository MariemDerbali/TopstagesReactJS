import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from "../../Coordinateur/MaterialTableIcons";
import Loading from '../../../../layouts/Topnet/Loading';

//pour modifier une question
export default function Editquestion(props) {


    //varibale d'état pour les erreurs des données saisies
    const [errorlist, setError] = useState([]);

    //Variables d'état pour afficher le spinner qui indique le chargement de la page
    const [loading, setLoading] = useState(true);

    // Le hook useHistory() renvoie une instance history , qui contient l'emplacement actuel (URL) du composant que nous pouvons utiliser pour naviguer entre les pages.
    const history = useHistory();

    //On utilise ce Hook -> useEFect() pour indiquer à React que notre composant doit exécuter quelque chose après chaque affichage
    useEffect(() => {


        const question_id = props.match.params._id//obtenir l'id de question à partir des paramètres d'URL
        //l'API pour afficher la question
        axios.get(`/api/edit-question/${question_id}`).then(res => {
            if (res.data.status === 200) {//si la question est trouvée
                setQuestion(res.data.question);//stockage de la question dans les variables d'état

            } else if (res.data.status === 404) {//si la question est non trouvée
                swal("", res.data.message, "error");//afficher un message d'erreur
                history.push('/serviceformation/Questions');//rediriger le service formation vers la page de consultation des questions
            }
            setLoading(false);//arrêter le chargement de la page
        });

    }, [props.match.params._id, history]);


    //variables d'état pour obtenir les valeurs saisies des champs de la question
    const [QuestionInput, setQuestion] = useState({
        questionText: '',
        niveau: '',
        duree: '',
    });

    //Puisque la valeur du champ est en permanence pilotée par l’état React.
    //Pour mettre à jour l'état local React
    //pour la question
    const handleInput = (e) => {
        e.persist();//cela devrait être appelé pour supprimer l'événement en cours du pool.
        setQuestion({ ...QuestionInput, [e.target.name]: e.target.value });//Stocker les valeurs saisies des champs de la question dans les variables d'état
    }

    //variables d'état pour obtenir l'image saisie de question
    const [picture, setPicture] = useState([]);
    //pour la question
    const handleImage = (e) => {
        setPicture({ questionImage: e.target.files[0] });
    }

    //fonction pour modifier une question
    const updateQuestion = (e) => {
        e.preventDefault();

        const question_id = props.match.params._id

        const formData = new FormData();

        if (QuestionInput.questionText == null) {

            formData.append('questionImage', picture.questionImage);
            formData.append('niveau', QuestionInput.niveau);
            formData.append('duree', QuestionInput.duree);
        } else if (QuestionInput.questionText && QuestionInput.questionImage) {
            formData.append('questionText', QuestionInput.questionText);
            formData.append('questionImage', picture.questionImage);
            formData.append('niveau', QuestionInput.niveau);
            formData.append('duree', QuestionInput.duree);
        }
        else {
            formData.append('questionText', QuestionInput.questionText);
            formData.append('niveau', QuestionInput.niveau);
            formData.append('duree', QuestionInput.duree);
        }



        axios.post(`/api/questions/${question_id}`, formData).then(res => {

            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                history.push('/serviceformation/Questions');
                setError([]);
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("", res.data.message, "error");
                history.push('/serviceformation/Questions')
            }
        });
    }





    {/* Get the responses list of current question*/ }
    const [reponse, setReponseList] = useState([

    ]);
    const question_id = props.match.params._id
    useEffect(() => {

        axios.get(`/api/reponses/${question_id}`).then(res => {
            if (res.data.status === 200) {
                setReponseList(res.data.reponses);
                //  console.log(res.data.reponses);
            }
        });


    }, [props.match.params._id, history]);




    {/* Activer ou Désactiver response*/ }



    const desactiverReponse = (e, oid) => {
        e.preventDefault();

        axios.put(`/api/desactiver-reponse/${oid}`).then(res => {

            if (res.data.status = 200) {
                swal("", res.data.message, "success");
                window.location.reload();
            } else if (res.data.status === 401) {
                swal("", res.data.message, "warning");

            }
        });

    }




    {/* Updating a response*/ }


    const [ReponseUpdateInput, setUpdateReponse] = useState({
        reponseText: '',
        reponseCorrecte: '',

    });


    const handleReponseUpdateInput = (e) => {
        e.persist();
        setUpdateReponse({ ...ReponseUpdateInput, [e.target.name]: e.target.value });
    }

    const [pictureresponseupdate, setPictureReponseUpdate] = useState([]);
    const handleImageUpdateResponse = (e) => {
        setPictureReponseUpdate({ reponseImage: e.target.files[0] });
    }


    const [reponse_id, setReponseID] = useState([]);

    const showFormUpdateReponse = (e, oid) => {
        e.preventDefault();
        setReponseID(oid);


        axios.get(`/api/edit-reponse/${oid}`).then(res => {
            if (res.data.status === 200) {
                setUpdateReponse(res.data.reponse);
            } else if (res.data.status === 404) {
                swal("", res.data.message, "error");
                history.push('/serviceformation/Questions');
            }
            setLoading(false);
        });

    }

    const updateReponse = (e) => {
        e.preventDefault();


        const formData = new FormData();

        if (ReponseUpdateInput.reponseText == null) {

            formData.append('reponseImage', pictureresponseupdate.reponseImage);
            formData.append('reponseCorrecte', ReponseUpdateInput.reponseCorrecte);

        } else if (ReponseUpdateInput.reponseText && ReponseUpdateInput.reponseImage) {
            formData.append('reponseText', ReponseUpdateInput.reponseText);
            formData.append('reponseImage', pictureresponseupdate.reponseImage);
            formData.append('reponseCorrecte', ReponseUpdateInput.reponseCorrecte);
        }
        else {
            formData.append('reponseText', ReponseUpdateInput.reponseText);
            formData.append('reponseCorrecte', ReponseUpdateInput.reponseCorrecte);

        }

        axios.post(`/api/reponses/${reponse_id}`, formData).then(res => {

            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                window.location.reload();
                setError([]);
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("", res.data.message, "error");
            }
        });
    }

    {/* adding a response*/ }

    function ReptextimageCheck() {

        if (document.getElementById('Reptext').checked) {

            document.getElementById('ifRepText').style.display = "block";
            document.getElementById('inputReptext').required = true
            document.getElementById('ifRepImage').style.display = "none";
            document.getElementById('ifRepTextImage').style.display = "none";
        }
        else if (document.getElementById('Repimage').checked) {

            document.getElementById('ifRepImage').style.display = "block";
            document.getElementById('inputRepimage').required = true

            document.getElementById('ifRepText').style.display = "none";
            document.getElementById('ifRepTextImage').style.display = "none";
        }
        else if (document.getElementById('Reptextimage').checked) {

            document.getElementById('ifRepTextImage').style.display = "block";

            document.getElementById('inputReptextimage1').required = true
            document.getElementById('inputReptextimage2').required = true


            document.getElementById('ifRepText').style.display = "none";
            document.getElementById('ifRepImage').style.display = "none";

        }
        else {
            document.getElementById('ifTextImage').style.display = "none";
            document.getElementById('ifText').style.display = "none";
            document.getElementById('ifImage').style.display = "none";

        }

    }


    const [ReponseInputAdd, setReponseAdd] = useState({
        reponseText: '',
        reponseCorrecte: '',

    });

    const [PictureRepAdd, setPictureRepAdd] = useState([]);

    const handleInputRepAdd = (e) => {
        e.persist();
        setReponseAdd({ ...ReponseInputAdd, [e.target.name]: e.target.value });
    }

    const handleImageRepAdd = (e) => {
        setPictureRepAdd({ reponseImage: e.target.files[0] });
    }

    const submitReponseAdd = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('reponseImage', PictureRepAdd.reponseImage);
        formData.append('reponseText', ReponseInputAdd.reponseText);
        formData.append('reponseCorrecte', ReponseInputAdd.reponseCorrecte);

        formData.append('questionID', question_id);

        axios.post('/api/reponses', formData).then(res => {
            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                setReponseList(reponse => [...reponse, res.data.reponse]);
                window.location.reload();
                setError([]);

            } else if (res.data.status === 422) {
                setError(res.data.errors);

            } else if (res.data.status === 423) {
                swal("", res.data.message, "warning");

            } else if (res.data.status === 505) {
                swal("", res.data.message, "warning");
            }

        })


    }


    if (loading) {
        <Loading />
    }

    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>Modifier question</h6>
                        </div>
                        <div className="card-body ">

                            <form className="row" onSubmit={updateQuestion}  >



                                {(QuestionInput.questionText == null) ?
                                    (
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Question image</label>
                                            <input onChange={handleImage} name="questionImage" className="form-control" type="file" />
                                            <small className="text-danger">{errorlist.questionImage}</small>
                                        </div>

                                    ) : (QuestionInput.questionText && QuestionInput.questionImage) ?
                                        (<div className="row">
                                            <div className="col-md-6">
                                                <label className="form-label">Question text</label>
                                                <input onChange={handleInput} value={QuestionInput.questionText} type="text" name="questionText" className="form-control" placeholder='Question' />
                                                <small className="text-danger">{errorlist.questionText}</small>

                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Question image</label>
                                                <input onChange={handleImage} name="questionImage" className="form-control" type="file" />
                                                <small className="text-danger">{errorlist.questionImage}</small>
                                            </div>
                                        </div>) :
                                        <div className="col-md-6">
                                            <label className="form-label">Question text</label>
                                            <input onChange={handleInput} value={QuestionInput.questionText} type="text" name="questionText" className="form-control" placeholder='Question' />
                                            <small className="text-danger">{errorlist.questionText}</small>

                                        </div>


                                }

                                <div className='row'>
                                    <div className="col-md-6">
                                        <label className="form-label">Durée de la question (En secondes)</label>
                                        <input onChange={handleInput} value={QuestionInput.duree} type="number" name="duree" className="form-control" placeholder='Durée question (En secondes)' />
                                        <small className="text-danger">{errorlist.duree}</small>

                                    </div>


                                    <div className="col-md-6 mt-3">
                                        <label className="form-label">Niveau de difficulté</label>
                                        <select onChange={handleInput} value={QuestionInput.niveau} name="niveau" className="form-select">
                                            <option  >Niveau de difficulté</option>
                                            <option>Facile</option>
                                            <option>Moyenne</option>
                                            <option>difficile</option>
                                        </select>
                                        <small className="text-danger">{errorlist.niveau}</small>
                                    </div>


                                </div>

                                <div className='row'>
                                    <div className="col-md-3 mt-4">
                                        <button type="submit" className="btn" style={{ backgroundColor: "#3a416f", color: '#fff' }}>Modifier</button>

                                    </div>

                                    <div className="col-6 mt-4">
                                        <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                            Créer réponses
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <form onSubmit={submitReponseAdd} >

                                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                            <input id='inputReptext' onChange={handleInputRepAdd} value={ReponseInputAdd.reponseText} type="text" name="reponseText" className="form-control" placeholder='Réponse' />
                                                            <small className="text-danger">{errorlist.reponseText}</small>

                                                        </div>
                                                    </div>
                                                </span>

                                                <span id="ifRepImage" style={{ display: "none" }}>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Réponse image</label>
                                                            <input id='inputRepimage' onChange={handleImageRepAdd} name="reponseImage" className="form-control" type="file" />
                                                            <small className="text-danger">{errorlist.reponseImage}</small>
                                                        </div>
                                                    </div>
                                                </span>


                                                <span id="ifRepTextImage" style={{ display: "none" }}  >
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <label className="form-label">Réponse text</label>
                                                            <input id='inputReptextimage1' onChange={handleInputRepAdd} value={ReponseInputAdd.reponseText} type="text" name="reponseText" className="form-control" placeholder='Réponse' />
                                                            <small className="text-danger">{errorlist.reponseText}</small>

                                                        </div>


                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Réponse image</label>
                                                            <input id='inputReptextimage2' onChange={handleImageRepAdd} name="reponseImage" className="form-control" type="file" />
                                                            <small className="text-danger">{errorlist.reponseImage}</small>

                                                        </div>
                                                    </div>
                                                </span>


                                                <div className="col-md-6">
                                                    <label className="form-label">Réponse correcte?</label>
                                                    <select onChange={handleInputRepAdd} value={ReponseInputAdd.reponseCorrecte} name="reponseCorrecte" className="form-select">
                                                        <option >Réponse correcte?</option>
                                                        <option>Oui</option>
                                                        <option>Non</option>
                                                    </select>
                                                    <small className="text-danger">{errorlist.reponseCorrecte}</small>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                                <button type="submit" className="btn btn-info">Créer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>



                            <div className="row">
                                <div className='col-12'>
                                    <div className="col-12">


                                        <form onSubmit={updateReponse}>

                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Modifier réponse</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">

                                                            {(ReponseUpdateInput.reponseText == null) ?
                                                                (
                                                                    <div className="col-md-6 mb-3">
                                                                        <label className="form-label">Réponse image</label>
                                                                        <input onChange={handleImageUpdateResponse} name="reponseImage" className="form-control" type="file" />
                                                                        <small className="text-danger">{errorlist.reponseImage}</small>
                                                                    </div>

                                                                ) : (ReponseUpdateInput.reponseText && ReponseUpdateInput.reponseImage) ?
                                                                    (<div className="row">
                                                                        <div className="col-md-6">
                                                                            <label className="form-label">Réponse text</label>
                                                                            <input onChange={handleReponseUpdateInput} value={ReponseUpdateInput.reponseText} type="text" name="reponseText" className="form-control" placeholder='Réponse' />
                                                                            <small className="text-danger">{errorlist.reponseText}</small>

                                                                        </div>
                                                                        <div className="col-md-6 mb-3">
                                                                            <label className="form-label">Réponse image</label>
                                                                            <input onChange={handleImageUpdateResponse} name="reponseImage" className="form-control" type="file" />
                                                                            <small className="text-danger">{errorlist.reponseImage}</small>
                                                                        </div>
                                                                    </div>) :
                                                                    <div className="col-md-6">
                                                                        <label className="form-label">Réponse text</label>
                                                                        <input onChange={handleReponseUpdateInput} value={ReponseUpdateInput.reponseText} type="text" name="reponseText" className="form-control" placeholder='Réponse' />
                                                                        <small className="text-danger">{errorlist.reponseText}</small>

                                                                    </div>


                                                            }

                                                            <div className="col-md-6">
                                                                <label className="form-label">Réponse correcte?</label>
                                                                <select onChange={handleReponseUpdateInput} value={ReponseUpdateInput.reponseCorrecte} name="reponseCorrecte" className="form-select">
                                                                    <option>Réponse correcte?</option>
                                                                    <option>Oui</option>
                                                                    <option>Non</option>
                                                                </select>
                                                                <small className="text-danger">{errorlist.reponseCorrecte}</small>
                                                            </div>
                                                        </div>


                                                        <div className="modal-footer">
                                                            <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                                            <button type="submit" className="btn btn-info">Modifier</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>




                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='col-6' >
                    <MaterialTable
                        columns={[
                            {
                                title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Réponse image</h1>
                                , render: reponse => {
                                    return (
                                        <div className="d-flex px-2 py-1">
                                            <div>
                                                {reponse.reponseImage ? <img src={`http://127.0.0.1:8000/${reponse.reponseImage}`} className="avatar avatar-sm me-3" alt="user1" /> : <span className="badge rounded-pill bg-light text-dark">Sans image</span>}
                                            </div>

                                        </div>)
                                }


                            },


                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Réponse text</h1>
                                , render: (reponse) => {
                                    return (
                                        <div>
                                            {reponse.reponseText ? <p className="text-xs font-weight-bold mb-0">{reponse.reponseText}</p> : <span className="badge rounded-pill bg-light text-dark">Sans texte</span>}
                                        </div>)
                                }


                            },

                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Réponse correcte?</h1>, render: reponse => {
                                    return (
                                        <span className="text-xs text-secondary mb-0">{reponse.reponseCorrecte}</span>

                                    )
                                },
                                customFilterAndSearch: (term, reponse) => ((reponse.reponseCorrecte).toLowerCase()).indexOf(term.toLowerCase()) != -1

                            },

                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{ marginLeft: '30px' }}>Etat</h1>, render: reponse => {
                                    return (
                                        <div>
                                            <Link to='#' onClick={(e) => desactiverReponse(e, reponse._id.$oid)}>
                                                {reponse.etat == 'inactive' ?
                                                    <button className="btn btn-danger">Désactivé</button> :
                                                    <button className="btn btn-success">Activé</button>}
                                            </Link>                                                              &nbsp;  &nbsp;  &nbsp; &nbsp;
                                            <Link to="#" onClick={(e) => showFormUpdateReponse(e, reponse._id.$oid)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-tools" viewBox="0 0 16 16">
                                                    <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z" />
                                                </svg>
                                            </Link>
                                        </div>

                                    )
                                }

                            },
                        ]

                        }
                        data={reponse}
                        title={<h6>Liste réponses</h6>}
                        icons={tableIcons}
                        options={{
                            padding: "dense",
                            pageSize: 2,
                            pageSizeOptions: [2, 3, 4],

                        }}

                    />
                </div>
            </div>
        </div>
    )
}
