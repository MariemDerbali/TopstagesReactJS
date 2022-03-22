import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import Footer from '../Footer';
import { Link } from "react-router-dom";

export default function Auth() {


    const history = useHistory();

    const [loginInput, setLogin] = useState({
        loginTOPNET: '',
        password: '',
        error_list: [],

    });

    const handleInputLogin = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }

    const loginConcat = "TOPNET/";

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            loginTOPNET: loginConcat + loginInput.loginTOPNET,
            password: loginInput.password
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/login-locale', data).then(res => {
                if (res.data.status === 200) {

                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);

                    if (res.data.role === 'Coordinateur') {
                        history.push('/coordinateur/dashboard');

                    } else if (res.data.role === 'ServiceFormation') {

                        history.push('/serviceformation/dashboard');

                    } else {
                        history.push('/');

                    }

                } else if (res.data.status === 401) {

                    swal("Warning", res.data.message, "warning");

                } else if (res.data.status === 429) {
                    swal("Oops", res.data.message, "error");

                } else if (res.data.status === 204) {
                    history.push(`/resetfirstloginpassword/${res.data.user_id}`);
                    console.log(res.data.token);
                } else if (res.data.status === 533) {
                    swal("Oops", res.data.message, "error");

                }
                else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });

                }
            });
        });



    }

    /*LOGIN LOGIC*/


    return (
        <div>

            <section className="min-vh-100 mb-8">
                <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" style={{ backgroundImage: `url("../assets/img/curved-images/curved14.jpg")` }}>
                    <span className="mask bg-gradient-dark opacity-6"></span>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-9 text-center mx-auto">
                                <h1 className="text-white mb-2 mt-5">Bienvenue sur<span style={{ color: 'orange' }}> TOPSTAGES!</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-lg-n10 mt-md-n11 mt-n10">

                        <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
                            <div className="card z-index-0">
                                <div className="card-header pb-0 text-left bg-transparent">
                                    <h3 className="font-weight-bolder text-info text-gradient">Connectez-vous</h3>
                                    <p className="mb-0">Veuillez saisir votre login et mot de passe pour accéder à votre espace </p>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={loginSubmit}>
                                        <label>Login</label>
                                        <div className="mb-3">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="topnet">TOPNET/</span>
                                                <input onChange={handleInputLogin} value={loginInput.loginTOPNET} name="loginTOPNET" type="text" className="form-control" placeholder="Login" a-label="Email" aria-describedby="topnet" />
                                                <span className="text-danger">{loginInput.error_list.loginTOPNET}</span>
                                            </div>
                                        </div>
                                        <label>Mot de passe</label>
                                        <div className="mb-3">
                                            <input onChange={handleInputLogin} value={loginInput.password} name="password" type="password" className="form-control" placeholder="Mot de passe" aria-label="Password" aria-describedby="password-addon" />
                                            <span className="text-danger">{loginInput.error_list.password}</span>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0">Connexion</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                    <p className="mb-4 text-sm mx-auto">
                                        <Link to="/topnet-forgotpassword" className="text-info text-gradient font-weight-bold">Mot de passe oublié ?</Link>
                                    </p>
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
