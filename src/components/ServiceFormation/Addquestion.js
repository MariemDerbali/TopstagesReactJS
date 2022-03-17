import axios from 'axios'
import React, { useState } from 'react'
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from "../coordinateur/MaterialTableIcons";

export default function Addquestion() {

    const history = useHistory();


    function textimageCheck() {

        if (document.getElementById('text').checked) {

            document.getElementById('ifText').style.display = "block";
            document.getElementById('inputtext').required = true
            document.getElementById('ifImage').style.display = "none";
            document.getElementById('ifTextImage').style.display = "none";
        }
        else if (document.getElementById('image').checked) {

            document.getElementById('ifImage').style.display = "block";
            document.getElementById('inputimage').required = true

            document.getElementById('ifText').style.display = "none";
            document.getElementById('ifTextImage').style.display = "none";
        }
        else if (document.getElementById('textimage').checked) {

            document.getElementById('ifTextImage').style.display = "block";

            document.getElementById('inputtextimage1').required = true
            document.getElementById('inputtextimage2').required = true


            document.getElementById('ifText').style.display = "none";
            document.getElementById('ifImage').style.display = "none";

        }
        else {
            document.getElementById('ifTextImage').style.display = "none";
            document.getElementById('ifText').style.display = "none";
            document.getElementById('ifImage').style.display = "none";

        }

    }

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


    const [QuestionInput, setQuestion] = useState({
        questionText: '',
        niveau: '',
        duree: '',


    });
    const [questionid, setQuestionID] = useState([]);


    const [ReponseInput, setReponse] = useState({
        reponseText: '',
        reponseCorrecte: '',
        questionid,

    });


    const [reponse, setReponseList] = useState([]);

    const [picture, setPicture] = useState([]);
    const [picturerep, setPicturerep] = useState([]);

    const [errorlist, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setQuestion({ ...QuestionInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        setPicture({ questionImage: e.target.files[0] });
    }

    const handleInputrep = (e) => {
        e.persist();
        setReponse({ ...ReponseInput, [e.target.name]: e.target.value });
    }

    const handleImagerep = (e) => {
        setPicturerep({ reponseImage: e.target.files[0] });
    }

    const submitReponse = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('reponseImage', picturerep.reponseImage);
        formData.append('reponseText', ReponseInput.reponseText);
        formData.append('reponseCorrecte', ReponseInput.reponseCorrecte);

        formData.append('questionID', questionid);

        axios.post('/api/reponses', formData).then(res => {
            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                //history.push('/serviceformation/Questions');
                setReponseList(reponse => [...reponse, res.data.reponse]);
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

    const submitQuestion = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('questionImage', picture.questionImage);
        formData.append('questionText', QuestionInput.questionText);
        formData.append('niveau', QuestionInput.niveau);
        formData.append('duree', QuestionInput.duree);



        axios.post('/api/questions', formData).then(res => {
            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                setQuestionID(res.data.questionId);
                // history.push('/serviceformation/Questions');
                setError([]);

            } else if (res.data.status === 422) {
                setError(res.data.errors);

            } else if (res.data.status === 505) {
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
                                    title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Réponse image</h1>
                                    , render: reponse => {
                                        return (
                                            <div className="d-flex px-2 py-1">
                                                <div>
                                                    <img src={`http://127.0.0.1:8000/${reponse.reponseImage}`} className="avatar avatar-sm me-3" alt="user1" />
                                                </div>

                                            </div>)
                                    }


                                },


                                {
                                    title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Réponse text</h1>
                                    , render: (reponse) => {
                                        return (
                                            <p className="text-xs font-weight-bold mb-0">{reponse.reponseText}</p>)
                                    }
                                    ,

                                    customFilterAndSearch: (term, reponse) => ((reponse.reponseText).toLowerCase()).indexOf(term.toLowerCase()) != -1


                                },

                                {
                                    title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Réponse correcte?</h1>, render: reponse => {
                                        return (
                                            <span className="text-xs text-secondary mb-0">{reponse.reponseCorrecte}</span>

                                        )
                                    },
                                    customFilterAndSearch: (term, reponse) => ((reponse.reponseCorrecte).toLowerCase()).indexOf(term.toLowerCase()) != -1

                                },




                            ]

                            }
                            data={reponse}
                            title={<h6>Liste réponses</h6>}
                            icons={tableIcons}

                        />
                    </div>

                </div>
            </div>

        </div>


    )


}
