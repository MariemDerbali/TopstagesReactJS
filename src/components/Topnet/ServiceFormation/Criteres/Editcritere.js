import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Loading from '../../../../layouts/Topnet/Loading';

export default function Editcritere(props) {

    const [errorlist, setError] = useState([]);


    const [loading, setLoading] = useState(true);

    const history = useHistory();


    const [CritereInput, setCritere] = useState({
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

    useEffect(() => {


        const critere_id = props.match.params._id
        axios.get(`/api/edit-critere/${critere_id}`).then(res => {
            if (res.data.status === 200) {
                setCritere(res.data.critere);

            } else if (res.data.status === 404) {
                swal("", res.data.message, "error");
                history.push('/serviceformation/Criteres');
            }
            setLoading(false);
        });

    }, [props.match.params._id, history]);





    const updateCritere = (e) => {
        e.preventDefault();
        const critere_id = props.match.params._id
        const formData = new FormData();
        formData.append('typestage', CritereInput.typestage);
        formData.append('nombrequestionsfaciles', CritereInput.nombrequestionsfaciles);
        formData.append('nombrequestionsmoyennes', CritereInput.nombrequestionsmoyennes);
        formData.append('nombrequestionsdifficiles', CritereInput.nombrequestionsdifficiles);
        formData.append('notequestionfacile', CritereInput.notequestionfacile);
        formData.append('notequestionmoyenne', CritereInput.notequestionmoyenne);
        formData.append('notequestiondifficile', CritereInput.notequestiondifficile);



        axios.post(`/api/criteres/${critere_id}`, formData).then(res => {

            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                history.push('/serviceformation/Criteres');
                setError([]);
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("", res.data.message, "error");
                history.push('/serviceformation/Criteres');
            }
        });
    }
    const [serviceslist, setServices] = useState([]);

    useEffect(() => {
        axios.get('/api/critere-services').then(res => {
            if (res.data.status === 200) {
                setServices(res.data.services);
            }
        });
    }, []);
    //si la page est en cours de chargement, donc afficher un spinner
    if (loading) {
        <Loading />
    }
    return (
        <div> <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>Modifier critère</h6>
                    </div>
                    <div className="card-body ">

                        <form className="row" onSubmit={updateCritere} >


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
                                <button type="submit" className="btn btn-info">Modifier</button>

                            </div>


                        </form>


                    </div>
                </div>
            </div>
        </div></div>
    )
}
