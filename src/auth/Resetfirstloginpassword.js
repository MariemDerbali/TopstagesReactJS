import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import Footer from './Footer'


export default function Resetfirstloginpassword() {

    const history = useHistory();

    const { user_id } = useParams();

    const [resetfirstloginpasswordInput, setResetfirstloginpassword] = useState({
        password: '',
        password_confirmation: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setResetfirstloginpassword({ ...resetfirstloginpasswordInput, [e.target.name]: e.target.value });
    }

    const resetfirstloginpasswordSubmit = (e) => {
        e.preventDefault();


        const data = {
            password: resetfirstloginpasswordInput.password,
            password_confirmation: resetfirstloginpasswordInput.password_confirmation
        }


        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/reset-firstloginpassword/${user_id}`, data).then(res => {
                if (res.data.status === 200) {

                    swal("Félicitations", res.data.message, "success");
                    history.push("/auth-topnet");

                } else if (res.data.status === 501) {
                    swal("Attention", res.data.message, "warning");
                } else if (res.data.status === 404) {
                    swal("Oops", res.data.message, "error");
                    // console.log(user_id);

                }
                else {

                    setResetfirstloginpassword({ ...resetfirstloginpasswordInput, error_list: res.data.validation_errors });

                }


            });

        });
    }


    return (
        <div>
            <section >
                <div className="container">
                    <div className="row">

                        <div className="col-lg-5 col-md-7 mx-auto">
                            <div className="card z-index-0 mt-sm-12 mt-9 mb-4">
                                <div className="card-header text-center pt-4 pb-1">
                                    <h3 className="font-weight-bolder mb-1">Changer votre mot de passe</h3>
                                    <p>Votre mot de passe a expiré. Veuillez saisir un nouveau mot de passe</p>

                                </div>
                                <div className="card-body">
                                    <form role="form" onSubmit={resetfirstloginpasswordSubmit} >

                                        <div className="mb-3">
                                            <label className="form-label">Nouveau mot de passe</label>
                                            <input name="password" onChange={handleInput} value={resetfirstloginpasswordInput.password} autoComplete="on" className="form-control" placeholder="Mot de passe" type="password" />
                                            <span className="text-danger">{resetfirstloginpasswordInput.error_list.password}</span>

                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Confirmer le nouveau mot de passe</label>
                                            <input name="password_confirmation" onChange={handleInput} value={resetfirstloginpasswordInput.password_confirmation} autoComplete="on" className="form-control" placeholder="Confirmation du mot de passe" type="password" />
                                            <span className="text-danger">{resetfirstloginpasswordInput.error_list.password}</span>

                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn bg-gradient-dark btn-lg w-100 my-4 mb-2">Changer le mot de passe!</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <Footer />
        </div>

    )
}
