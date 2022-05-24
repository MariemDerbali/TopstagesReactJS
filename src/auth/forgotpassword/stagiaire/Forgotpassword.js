import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import Footer from '../../Footer'


export default function Forgotpassword() {

    const history = useHistory();

    const [forgotpasswordInput, setForgotpassword] = useState({

        email: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setForgotpassword({ ...forgotpasswordInput, [e.target.name]: e.target.value });
    }

    const forgotpasswordSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: forgotpasswordInput.email,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/stagiaire-forgot-password', data).then(res => {

                if (res.data.status === 200) {

                    swal("Félicitations", res.data.message, "success");
                    history.push("/auth");

                } else if (res.data.status === 401) {

                    swal("Attention", res.data.message, "warning");
                } else {
                    setForgotpassword({ ...forgotpasswordInput, error_list: res.data.validation_errors });
                }
            });
        });



    }

    return (
        <div style={{ backgroundColor: '#081339' }}>
            <section >
                <div className="container">
                    <div className="row">

                        <div className="col-lg-5 col-md-7 mx-auto">
                            <div className="card z-index-0 mt-sm-9  mb-4">
                                <div className="card-header text-center pt-4 pb-1">
                                    <h3 className="font-weight-bolder mb-1">Réinitialiser votre mot de passe</h3>
                                    <p className="mb-0" style={{ color: '#ef8e1f' }}>Vous recevrez un e-mail dans un délai maximum de 60 secondes
                                    </p>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={forgotpasswordSubmit} >

                                        <div className="mb-3">
                                            <input onChange={handleInput} value={forgotpasswordInput.email} name="email" type="email" className="form-control" placeholder="Email" a-label="Email" aria-describedby="email-addon" required />
                                            <span className="text-danger">{forgotpasswordInput.error_list.email}</span>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn bg-gradient-info btn-lg w-100 my-4 mb-2">Envoyer</button>
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
