import React from 'react'
import { useState } from "react"


export default function Addquestion() {
    const [formValues, setFormValues] = useState([{ name: "", email: "" }])

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { name: "", email: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }



    function textimageCheck() {
        if (document.getElementById('text').checked) {
            document.getElementById('ifText').style.display = "block";
            document.getElementById('ifImage').style.display = "none";
            document.getElementById('ifTextImage').style.display = "none";
        }
        else if (document.getElementById('image').checked) {
            document.getElementById('ifImage').style.display = "block";
            document.getElementById('ifText').style.display = "none";
            document.getElementById('ifTextImage').style.display = "none";
        }
        else {
            document.getElementById('ifTextImage').style.display = "block";
            document.getElementById('ifText').style.display = "none";
            document.getElementById('ifImage').style.display = "none";

        }

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

                            <form className="row"  >


                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor=""><strong>Type de question</strong></label><br />
                                        <input type="radio" name="radio" value="text" id="text" onClick={textimageCheck} />&nbsp;<label htmlFor="">Text</label> &nbsp;&nbsp;&nbsp;
                                        <input type="radio" name="radio" value="image" id="image" onClick={textimageCheck} />&nbsp;<label htmlFor="">Image</label> &nbsp;&nbsp;&nbsp;
                                        <input type="radio" name="radio" value="textimage" id="textimage" onClick={textimageCheck} defaultChecked />&nbsp;<label htmlFor="">Text et image</label>

                                    </div>
                                </div>
                                <span id="ifText" style={{ display: "none" }}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label">Question text</label>
                                            <input type="text" name="question" className="form-control" placeholder='Question' />
                                        </div>
                                    </div>
                                </span>

                                <span id="ifImage" style={{ display: "none" }}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Question image</label>
                                            <input name="questionImage" className="form-control" type="file" id="formFile" />
                                        </div>
                                    </div>
                                </span>


                                <span id="ifTextImage">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label">Question text</label>
                                            <input type="text" name="question" className="form-control" placeholder='Question' />
                                        </div>


                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Question image</label>
                                            <input name="questionImage" className="form-control" type="file" id="formFile" />
                                        </div>
                                    </div>
                                </span>

                                <div className="col-md-6">
                                    <label className="form-label">Durée de la question (s)</label>
                                    <input type="text" name="duree" className="form-control" placeholder='Durée question (s)' />
                                </div>



                                <div className="col-md-6">
                                    <label className="form-label">Niveau de difficulté</label>
                                    <select name="niveau" className="form-select">
                                        <option >Niveau de difficulté</option>
                                        <option>Facile</option>
                                        <option>Moyenne</option>
                                        <option>difficile</option>
                                    </select>
                                </div>

                                <div className="col-md-6" >
                                    <label>Réponse 1</label>
                                    <input type="text" className="form-control" name="name" value="" />
                                    <input name="questionImage" className="form-control mt-2" type="file" id="formFile" />
                                    <select name="niveau" className="form-select mt-2">
                                        <option >Réponse correcte?</option>
                                        <option>Oui</option>
                                        <option>Non</option>

                                    </select>
                                </div>
                                {formValues.map((element, index) => (
                                    <div className="col-md-6" key={index}>
                                        <label>Réponse {index + 2}</label>
                                        <input type="text" className="form-control" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
                                        <input name="questionImage" className="form-control mt-2" type="file" id="formFile" />
                                        <select name="niveau" className="form-select mt-2">
                                            <option >Réponse correcte?</option>
                                            <option>Oui</option>
                                            <option>Non</option>

                                        </select>
                                        {
                                            index >= 1 ?
                                                <button type="button" className="btn btn-outline-danger mt-2" onClick={() => removeFormFields(index)}>x</button>
                                                : null
                                        }
                                    </div>

                                ))}
                                <div className="col-sm-12 mt-2">
                                    <button className="btn btn-outline-success " type="button" onClick={() => addFormFields()}>Ajouter réponse</button>
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
