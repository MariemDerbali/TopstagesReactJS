import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';


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


    const [QuestionInput, setQuestion] = useState({
        questionText: '',
        niveau: '',
        duree: '',


    });

    const [picture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setQuestion({ ...QuestionInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        setPicture({ questionImage: e.target.files[0] });
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
                history.push('/serviceformation/Questions');
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
                                        <option >Niveau de difficulté</option>
                                        <option>Facile</option>
                                        <option>Moyenne</option>
                                        <option>difficile</option>
                                    </select>
                                    <small className="text-danger">{errorlist.niveau}</small>
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
